import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

import { ProjectCreationSchema } from '../types/types'

// Función necesaria para traducir los puntos relevantes del equipo
export async function englishToSpanish(points: Record<string, any>) {
  const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash-lite',
    temperature: 0,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  })

  const systemTemplate = `You are a translator. Translate the following points from English to Spanish. Make sure to
   keep the meaning and context of the original text and not modify the JSON structure.`

  const humanTemplate = `Translate the following points in the JSON: {list}`

  const chatTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['user', humanTemplate],
  ])

  const parser = new JsonOutputParser()
  const chain = chatTemplate.pipe(llm).pipe(parser)

  const result = await chain.invoke({
    list: points,
  })

  return result
}

// Función necesaria para traducir el proyecto a ingles y generar un mejor embedding
export async function spanishToEnglish({ name, description, technologies }: ProjectCreationSchema) {
  const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash-lite',
    temperature: 0,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  })

  const systemTemplate = `Eres un traductor. Traduce el siguiente texto del español al inglés. Asegúrate de conservar 
   el significado y el contexto del texto original y devuelvelo en el formato JSON: 
      "name": "string",
      "description": "string",
      "technologies": "string"
   `

  const humanTemplate = `Traduce el siguiente nombre del proyecto: {nameP}, la descripción del proyecto: {descP} y las 
   tecnologías: {techsP}.`

  const chatTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['user', humanTemplate],
  ])

  const parser = new JsonOutputParser()
  const chain = chatTemplate.pipe(llm).pipe(parser)

  const result = await chain.invoke({
    nameP: name,
    descP: description,
    techsP: technologies,
  })

  return result
}
