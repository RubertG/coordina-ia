'use server'

import { WorkersService } from '@/modules/workers'
import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

import { ProjectCreationSchema } from '../types/types'
import { englishToSpanish } from './translator.service'

/**
 * Servicio que utiliza LangChain para devolver puntos claves de los mejores trabajadores para un proyecto.
 * @param formData - Datos del formulario de creación de proyecto.
 * @returns Una objeto con las IDs y los puntos clave del trabajador.
 */
export async function LangChainService(idsWorkers: string[], {
  description,
  technologies,
}: ProjectCreationSchema): Promise<Record<string, any>[]> {
  const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    temperature: 0,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  });

  const systemTemplate = `VERY IMPORTANT: You must return ONLY a JSON object with the following structure:
    "id": "string",
    "points": ["string"]
  
  Do not include any additional text, explanations, or formatting. Act as an expert in the formation of software 
  development teams, especially in teams that handle {techs} technologies. You will receive a data structure that has 
  employee information such as id, curriculum and name.`

  const humanTemplate = `According to the following worker: {worker}. Based on their curriculum, provide the key points 
  that make the worker suitable for the project described as: {desc}. The points should be brief, concise and 3 points 
  maximum.`

  const chatTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['user', humanTemplate],
  ])

  let result = []
  const parser = new JsonOutputParser()
  const chain = llm.pipe(parser)

  for (let i = 0; i < idsWorkers.length; i++) {
    const worker = await WorkersService.getWorker(idsWorkers[i]);
    const rta = await chatTemplate.invoke({
        techs: technologies,
        worker: worker.data,
        desc: description
    });

    let rawData = await chain.invoke(rta);
    let translated = await englishToSpanish(rawData);
    result.push(translated);
  }
  
  return result;
}
