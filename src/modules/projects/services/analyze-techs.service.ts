import { StringOutputParser } from "@langchain/core/output_parsers"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

export async function analyzeTechnologies(nameP: string, descriptionP: string, technologiesP: string) {
   const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      temperature: 0,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
   })

  const systemTemplate = `VERY IMPORTANT: Your response should be 'OK.' or 'I must suggest alternative technologies for the project.'.
  
  Do not include any additional text, explanations, or formatting. Act as an expert in the suggestion of technologies and frameworks for a software development project.
  You will recieve a name and a description of a project.`

  const humanTemplate = `According to the following name: {name} and description: {desc}. Evaluate whether the listed technologies: {techs} are sufficient and appropriate to fully and efficiently develop the project.
  - Carefully check if the technologies cover all necessary areas: frontend, backend, database, DevOps, AI and machine learning components.
  - If the listed technologies are complete and appropriate for all technical and functional requirements of the project, respond with 'OK.'.
  - If the listed technologies are lacking in any area or could be improved with additional or alternative technologies, respond with 'I must suggest alternative technologies for the project.'`

  const chatTemplate = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      ['user', humanTemplate]
   ])

   const parser = new StringOutputParser()
   const chain = chatTemplate.pipe(llm).pipe(parser)

   const result = await chain.invoke({
      name: nameP,
      desc: descriptionP,
      techs: technologiesP
   })
   
   return result
}