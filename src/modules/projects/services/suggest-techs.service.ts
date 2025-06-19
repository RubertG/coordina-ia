import { StringOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

export async function suggestsTechnologies(nameP: string, descriptionP: string) {
  const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    temperature: 0,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  })

  const systemTemplate = `VERY IMPORTANT: Your response should be a list of comma separated values, eg: 'foo, bar, baz'.
  
  Do not include any additional text, explanations, or formatting. Act as an expert in the suggestion of technologies and frameworks for a software development project.
  You will recieve a name and a description of a project`

  const humanTemplate = `According to the following name: {name} and description: {desc}. Provide the best technologies and frameworks that fits for the project described.
  The response must be less than 10 technologies and frameworks.`

  const chatTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['user', humanTemplate],
  ])

  const parser = new StringOutputParser()
  const chain = chatTemplate.pipe(llm).pipe(parser)

  const result = await chain.invoke({
    name: nameP,
    desc: descriptionP,
  })

  return result
}
