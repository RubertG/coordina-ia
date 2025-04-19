import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { JsonOutputParser } from '@langchain/core/output_parsers'

import { ProjectCreationSchema } from '../types/types'

// Función necesaria para traducir los puntos relevantes del trabajador
export async function englishToSpanish(points: Record<string, any>) {
   const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-1.5-flash',
      temperature: 0,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
   });

   const systemTemplate = `You are a translator. Translate the following points from English to Spanish. Make sure to
   keep the meaning and context of the original text and not modify the JSON structure.`

   const humanTemplate = `Translate the following points in the JSON: {list}`

   const chatTemplate = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      ['user', humanTemplate],
   ]);

   const parser = new JsonOutputParser()
   const chain = llm.pipe(parser)
   const rta = await chatTemplate.invoke({
      list: points
   });

   let result = await chain.invoke(rta);

   return result;
}

// Función necesaria para traducir el proyecto a ingles y generar un mejor embedding
export async function spanishToEnglish({ name, description, technologies }: ProjectCreationSchema) {
   const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-1.5-flash',
      temperature: 0,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
   });

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
   ]);

   const parser = new JsonOutputParser()
   const chain = llm.pipe(parser)
   const rta = await chatTemplate.invoke({
      nameP: name,
      descP: description,
      techsP: technologies
   });

   let result = await chain.invoke(rta);
   
   return result;
}