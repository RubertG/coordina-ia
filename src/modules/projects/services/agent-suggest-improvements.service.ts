'use server'

import { createClientServer } from '@/modules/core'
import { getWorker } from '@/modules/workers'
import { PromptTemplate } from '@langchain/core/prompts'
import { DynamicTool } from '@langchain/core/tools'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { AgentExecutor, createReactAgent } from 'langchain/agents'

import { ProjectCreationSchema, Worker, Result } from '../types/types'
import { analyzeTeam } from './analyze-team.service'
import { analyzeTechnologies } from './analyze-techs.service'
import { getRecommendedWorkers } from './recommended-workers.service'
import { suggestTeam } from './suggest-team.service'
import { suggestsTechnologies } from './suggest-techs.service'
import { spanishToEnglish } from './translator.service'

export async function customAgent(formData: ProjectCreationSchema, workers: string[], team: string[]): Promise<Result> {
  const supabase = await createClientServer()

  // #TOOLS#
  const tools = [
    new DynamicTool({
      name: 'AnalyzeTechnologies',
      description: `Checks if the project has appropriate technologies.
                  Input MUST be a JSON object with the following keys:
                  - "name": string (The name of the project)
                  - "description": string (A detailed description of the project)
                  - "technologies": string (The list of technologies to analyze separated by commas)`,
      func: async (input: string) => {
        const { name, description, technologies } = JSON.parse(input)
        return analyzeTechnologies(name, description, technologies)
      },
    }),
    new DynamicTool({
      name: 'SuggestTechnologies',
      description: `Suggests appropriate technologies for the project based on its description.
                  Use this when no technologies are provided or if existing ones need to be re-evaluated.
                  Input MUST be a JSON object with the following keys:
                  - "name": string (The name of the project)
                  - "description": string (A detailed description of the project)`,
      func: async (input: string) => {
        const { name, description } = JSON.parse(input)
        return suggestsTechnologies(name, description)
      },
    }),
    new DynamicTool({
      name: 'RecommendWorkers',
      description: `Recommends suitable worker IDs for a project.
                  Use this tool when no worker IDs are available and need to be generated.
                  Input MUST be a JSON object with the following keys:
                  - "name": string (The name of the project)
                  - "description": string (A detailed description of the project)
                  - "technologies": string (The list of technologies required for the project separeted by commas)
                  - "maxWorkers": number (The maximum number of workers to recommend)`,
      func: async (input: string) => {
        const { name, description, technologies, maxWorkers } = JSON.parse(input)
        const formData = { name, description, technologies, maxWorkers }
        const bestWorkers = await getRecommendedWorkers(formData)
        const workersId = bestWorkers.data.map((worker) => worker.id)
        return JSON.stringify(workersId)
      },
    }),
    new DynamicTool({
      name: 'AnalyzeTeam',
      description: `Checks if a given team (by their IDs) is suitable for the project based on its description and technologies.
                  Use this tool when you have existing team IDs and worker IDs.
                  Input MUST be a JSON object with the following keys:
                  - "team": array of strings (The list of IDs that make up the team)
                  - "description": string (A detailed description of the project)
                  - "technologies": string (The list of technologies required for the project separeted by commas)`,
      func: async (input: string) => {
        const { team, description, technologies } = JSON.parse(input)
        return analyzeTeam(team, description, technologies)
      },
    }),
    new DynamicTool({
      name: 'SuggestTeam',
      description: `Suggests the optimal team composition (as a list of worker IDs) from a list of available workers.
                  Use this tool when you have a list of worker IDs but no specific team has been formed yet, or if an existing team needs re-evaluation based on available workers.
                  Input MUST be a JSON object with the following keys:
                  - "workers": array of strings (The list of all available worker IDs to choose from)
                  - "description": string (A detailed description of the project)
                  - "technologies": string (The list of technologies required for the project separeted by commas)
                  - "maxWorkers": number (The maximum desired size for the suggested team)`,
      func: async (input: string) => {
        const { workers, description, technologies, maxWorkers } = JSON.parse(input)
        const team = await suggestTeam(workers, description, technologies, maxWorkers)
        return JSON.stringify(team)
      },
    }),
  ]

  // #AGENT#
  const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    temperature: 0.3,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  })

  const promptString = `Answer the following questions as best you can. You have access to the following tools:

{tools}

Use the following format STRICTLY. In each of your responses, you MUST provide EITHER an Action/Action Input block OR a Final Answer block. NEVER BOTH.
You will be given an Observation after an Action is performed. DO NOT generate the Observation yourself.

Question: the input question you must answer
Thought: you should always think about what to do to answer the question.
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action (MUST be a JSON string if the tool description says so)
(After this, you STOP. The system will provide an Observation.)

OR if you know the answer:

Thought: I now know the final answer.
Final Answer: the final answer to the original input question

Let's begin!

Question: {input}
Thought:{agent_scratchpad}`

  const prompt = PromptTemplate.fromTemplate(promptString)
  const agent = await createReactAgent({
    llm,
    tools,
    prompt,
  })
  const executor = new AgentExecutor({
    agent,
    tools,
    //verbose: true,
    returnIntermediateSteps: true,
    handleParsingErrors: true,
  })

  // #STRUCTURE OF PROJECT INPUT#
  const project = await spanishToEnglish(formData)
  const proyecto: ProjectCreationSchema = {
    name: project.name,
    description: project.description,
    technologies: project.technologies,
    maxWorkers: formData.maxWorkers,
  }

  const inputObject = {
    name: proyecto.name,
    description: proyecto.description,
    technologies: proyecto.technologies,
    maxWorkers: proyecto.maxWorkers,
    workers: workers,
    team: team,
  }

  // #CALL THE AGENT#
  const response = await executor.invoke({
    input: `You are a project setup assistant. Your goal is to process a project request and determine the optimal technologies, recommend workers, and suggest a team. Follow these steps meticulously:

The project details are:
${JSON.stringify(inputObject)}

**Workflow:**

**Phase 1: Technology Assessment & Finalization**
1. Check Input for Technologies:
      Examine 'inputObject.technologies'.
2. Analyze or Suggest Technologies:
      If 'inputObject.technologies' is provided AND not empty:
         Use the 'AnalyzeTechnologies' tool.
         If the observation from 'AnalyzeTechnologies' indicates the technologies are unsuitable or that alternatives must be suggested:
            Then, use the 'SuggestTechnologies' tool. These newly suggested technologies become the **finalized technologies** for the project.
            Set the flag **technologies_were_altered** = true.
         Else (if 'AnalyzeTechnologies' indicates they are suitable):
            The provided 'inputObject.technologies' become the **finalized technologies**.
            Set the flag **technologies_were_altered** = false.
      Else (if 'inputObject.technologies' is NOT provided OR is empty):
         Use the 'SuggestTechnologies' tool. The result becomes the **finalized technologies**.
         Set the flag **technologies_were_altered** = true.
3. Outcome of Phase 1: You must now have a list of **finalized technologies** and the boolean flag **technologies_were_altered**. All subsequent steps will use these.

**Phase 2: Worker Identification**
1. Check Input for Worker IDs:
      Examine 'inputObject.workers'.
      Refer to the **technologies_were_altered** flag from Phase 1.
2. Recommend Workers if Necessary:
      If 'inputObject.workers' is NOT provided OR is empty OR **technologies_were_altered** is true:
         Use the 'RecommendWorkers' tool.
         The input for 'RecommendWorkers' must have the **finalized technologies** from Phase 1.
         The result from 'RecommendWorkers' becomes the **available workers**.
      Else (if 'inputObject.workers' IS provided AND **technologies_were_altered** is false):
         These provided IDs become the **available workers*.
3. Outcome of Phase 2: You must now have a **available workers**. All subsequent steps will use these.

**Phase 3: Team Formation & Analysis**
1. Check Input for Team IDs:
      Examine 'inputObject.team'.
2. Analyze or Suggest Team:
      If 'inputObject.team' IS provided AND not empty:
         Use the 'AnalyzeTeam' tool.
         The input for 'AnalyzeTeam' must have the **finalized technologies** from Phase 1.
         If the observation from 'AnalyzeTeam' indicates the team is unsuitable or that alternatives must be suggested:
            Then, use the 'SuggestTeam' tool.
            The input for 'SuggestTeam' must have the **available workers** from Phase 2 and **finalized technologies** from Phase 1.
            The result from 'SuggestTeam' becomes the **final team composition**.
         Else (if 'AnalyzeTeam' indicates the team is suitable):
            The provided 'inputObject.team' becomes the **final team composition**.
      Else (if 'inputObject.team' is NOT provided OR is empty):
         Use the 'SuggestTeam' tool.
         The input for 'SuggestTeam' must have the **available workers** from Phase 2 and **finalized technologies** from Phase 1.
         The result from 'SuggestTeam' becomes the **final team composition**.
3. Outcome of Phase 3: You must now have a **final team composition** (list of team IDs). All subsequent steps will use these.

**Phase 4: Final Answer Submission**
1. Compile a summary of your findings.
2. Your final answer should clearly state:
      The project name.
      The **finalized technologies** used for the project.
      The **available workers** (the list of workers IDs available).
      The **final team composition** (the list of worker IDs selected for the team).
      A brief justification if any initial inputs were overridden (e.g., "Initial technologies were unsuitable and replaced.").

**Important Considerations:**
   **Data Flow:** Ensure the output of one step (e.g., finalized technologies, list of worker IDs) is correctly used as input for subsequent steps.
   **Tool Output:** Pay close attention to the format of the observation from each tool. For example, 'RecommendWorkers' should ideally return a list of worker IDs that can be directly used by 'SuggestTeam' or 'AnalyzeTeam'. If a tool returns data in a complex object, you must extract the necessary information.
   **Error Handling (Implicit):** If a tool fails or provides unexpected output, try to proceed logically based on the workflow (e.g., if 'RecommendWorkers' fails to find workers, you might not be able to form a team). Your final answer should reflect any such issues.`,
  })

  // EXTRACT THE RESPONSES#
  let workersIds: string[] = []
  let teamIds: string[] = []
  let teamPoints: string[] = []
  const result: Result = {
    technologies: '',
    workers: [],
    team: { workers: [], points: [] },
  }
  if (response.intermediateSteps && response.intermediateSteps.length > 0) {
    response.intermediateSteps.forEach((step: any, index: number) => {
      if (step.action.tool === 'SuggestTechnologies') {
        result.technologies = step.observation
      }
      if (step.action.tool === 'AnalyzeTechnologies' && step.observation === 'OK') {
        result.technologies = proyecto.technologies
      }
      if (step.action.tool === 'AnalyzeTeam' && step.observation === 'OK') {
        workersIds = workers
        teamIds = team
      }
      if (step.action.tool === 'RecommendWorkers') {
        workersIds = JSON.parse(step.observation)
      }
      if (step.action.tool === 'SuggestTeam') {
        const aux = JSON.parse(step.observation)
        teamIds = aux.ids
        teamPoints = aux.points
      }

      console.log(`--- Step ${index + 1} ---`)
      console.log(`>> Output from ${step.action.tool}:`, step.observation)
    })
  }

  // #GET INFO OF WORKERS#
  workersIds = workersIds.filter((id) => !teamIds.includes(id))
  const myWorkers = await Promise.all(
    workersIds.map(async (id) => {
      return await getWorker(id)
    }),
  )
  const myTeam = await Promise.all(
    teamIds.map(async (id) => {
      return await getWorker(id)
    }),
  )

  const finalWorkers = await Promise.all(
    myWorkers.map(async (worker): Promise<Worker> => {
      const { data: projects, error: projectsError } = await supabase
        .from('Proyecto_Trabajador')
        .select('id_Proyecto')
        .eq('id_Trabajador', worker.data[0].id)

      if (projectsError || !projects) {
        return {
          name: worker.data[0].nombre,
          id: worker.data[0].id,
          curriculum: worker.data[0].curriculum,
          numberOfJobs: 0,
        }
      }

      return {
        name: worker.data[0].nombre,
        id: worker.data[0].id,
        curriculum: worker.data[0].curriculum,
        numberOfJobs: projects.length,
      }
    }),
  )

  const finalTeam = await Promise.all(
    myTeam.map(async (worker): Promise<Worker> => {
      const { data: projects, error: projectsError } = await supabase
        .from('Proyecto_Trabajador')
        .select('id_Proyecto')
        .eq('id_Trabajador', worker.data[0].id)

      if (projectsError || !projects) {
        return {
          name: worker.data[0].nombre,
          id: worker.data[0].id,
          curriculum: worker.data[0].curriculum,
          numberOfJobs: 0,
        }
      }

      return {
        name: worker.data[0].nombre,
        id: worker.data[0].id,
        curriculum: worker.data[0].curriculum,
        numberOfJobs: projects.length,
      }
    }),
  )

  // #PREPARE THE RESPONSE#
  result.workers = finalWorkers
  result.team.workers = finalTeam
  result.team.points = teamPoints

  console.log('Final result:', result)

  return result
}
