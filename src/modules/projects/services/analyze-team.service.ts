import { getWorker } from "@/modules/workers"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

export async function analyzeTeam(idsWorkers: string[], descriptionP: string, technologiesP: string) {
   const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      temperature: 0,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
   })

  const systemTemplate = `VERY IMPORTANT: Your response should be 'OK.' or 'I must suggest alternative workers for the project.'.
  
  Do not include any additional text, explanations, or formatting. Act as an expert in the formation of software development teams, especially in teams that handle {techs} technologies.
  You will receive a data structure that has employee information such as id, curriculum and name.`

  const humanTemplate = `According to the following workers: {workers}. Evaluate whether their backgrounds align well with the project described as: {desc}.
  For the selected group, focus on the collective strengths they bring to the project as a team.
  - If the workers are suitable, respond with 'OK.'
  - If they are not suitable, respond with 'I must suggest alternative workers for the project.'`

  const chatTemplate = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      ['user', humanTemplate]
   ])

  const parser = new StringOutputParser()
  const chain = chatTemplate.pipe(llm).pipe(parser)

  const workers = await Promise.all(
    idsWorkers.map(async (id) => {
      return await getWorker(id)
    })
  )

   const result = await chain.invoke({
      workers: workers,
      desc: descriptionP,
      techs: technologiesP
   })
   
   return result
}