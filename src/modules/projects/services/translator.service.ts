import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { JsonOutputParser } from '@langchain/core/output_parsers'

// Función necesaria para traducir los puntos relevantes del trabajador
export async function englishToSpanish(points: Record<string, any>) {
   const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
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
export async function spanishToEnglish(name: string, description: string, techs: string) {
   const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      temperature: 0,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
   });

   const systemTemplate = `You are a translator. Translate the following text from Spanish to English. Make sure to 
   keep the meaning and context of the original text and return in the JSON structure: 
      "name": "string",
      "description": "string",
      "technologies": "string"
   `

   const humanTemplate = `Translate the following project name: {nameP}, project description: {descP} and  project 
   technologies: {techsP}.`

   const chatTemplate = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      ['user', humanTemplate],
   ]);

   const parser = new JsonOutputParser()
   const chain = llm.pipe(parser)
   const rta = await chatTemplate.invoke({
      nameP: name,
      descP: description,
      techsP: techs
   });

   let rawData = await chain.invoke(rta);
   let result = `Project Name: ${rawData.name}. Project Description: ${rawData.description}. Technologies: ${rawData.technologies}`
   
   return result;
}