'use server'

import { getWorker } from '@/modules/workers'
import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

import { englishToSpanish } from './translator.service'

/**
 * Servicio que utiliza LangChain para devolver el mejor equipo posible segun los CVs de los trabajadores.
 * @param formData - Datos del formulario de creación de proyecto.
 * @returns Una objeto con las IDs de los mejores trabajadores y los puntos clave.
 */
export async function suggestTeam(
  idsWorkers: string[],
  descriptionP: string,
  technologiesP: string,
  cantidadP: string,
) {
  const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    temperature: 0,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  })

  const systemTemplate = `VERY IMPORTANT: You must return ONLY a JSON object with the following structure:
    "id": ["string"],
    "points": ["string"]
  
  Do not include any additional text, explanations, or formatting, and ensure that the format of the points is plain text without any markdown symbols (e.g., no **, *, or other formatting characters).
  Act as an expert in the formation of software development teams, especially in teams that handle {techs} technologies.
  You will receive a data structure that has employee information such as id, curriculum and name.`

  const humanTemplate = `According to the following workers: {workers}. Based on their curriculum, select {cant} workers whose backgrounds best align with the project described as: {desc}.
  For the selected group, provide up to six concise bullet points that highlight the collective strengths they bring to the project as a team.
  Five of these points should focus on how their collective skills, experience, and expertise complement each other to enhance collaboration, role balance, and overall team performance.
  The sixth point should emphasize the team's soft skills, such as communication, adaptability, leadership, teamwork, or other interpersonal strengths relevant to the success of the project.`

  const chatTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['user', humanTemplate],
  ])

  const parser = new JsonOutputParser()
  const chain = chatTemplate.pipe(llm).pipe(parser)

  const workers = await Promise.all(
    idsWorkers.map(async (id) => {
      return await getWorker(id)
    }),
  )

  const rawData = await chain.invoke({
    techs: technologiesP,
    workers: workers,
    desc: descriptionP,
    cant: cantidadP,
  })
  const translated = await englishToSpanish(rawData)

  return {
    ids: translated.id,
    points: translated.points,
  }
}
