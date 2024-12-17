'use server'

import { WorkersService } from '@/modules/workers'
import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

import { ProjectCreationSchema } from '../types/types'

/**
 * Servicio que utiliza LangChain para obtener los mejores trabajadores para un proyecto.
 * @param formData - Datos del formulario de creación de proyecto.
 * @returns Una lista de IDs de los mejores trabajadores.
 */
export async function LangChainService({
  description,
  maxWorkers,
  technologies,
}: ProjectCreationSchema): Promise<string[]> {
  const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-1.5-flash',
    temperature: 0,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  })

  const systemTemplate = `VERY IMPORTANT: You should only return the id of the users who are the best, no additional
   information. Act as an expert in the formation of software development teams, especially in teams that handle {techs}
   technologies. You will receive a data structure that has employee information such as id, curriculum and name.`

  const humanTemplate = `According to the following list of workers: {workers} , analyze each curriculum and choose
   the {cant} best members who can form a development team that has the following description: {desc}. Show them from
   best to worst in json format`

  const chatTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['user', humanTemplate],
  ])
  let rawData
  let result = []
  const parser = new JsonOutputParser()
  const chain = llm.pipe(parser)

  const wor = await WorkersService.getWorkers()

  if (wor.data) {
    const rta = await chatTemplate.invoke({
      techs: technologies,
      workers: wor.data,
      cant: maxWorkers,
      desc: description,
    })

    rawData = await chain.invoke(rta)
  }

  if (rawData && Array.isArray(rawData)) {
    result = rawData.map((id) => id.toString())
  }

  return result
}
