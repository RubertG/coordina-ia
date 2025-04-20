import { GoogleGenAI } from '@google/genai'
import { createClientClient } from '@/modules/core'

export async function cosineSimilarity(project: Record<string, any>, cant: string) {
   const supabase = createClientClient()
   const prompt = `Project Name: ${project.name}. Project Description: ${project.description} Technologies: ${project.technologies}.`
   let embeddingPrompt = null

   const llm = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
   })

   const result = await llm.models.embedContent({
      model: 'text-embedding-004',
      contents: prompt,
      config: {
        taskType: 'RETRIEVAL_QUERY',
      },
   })

   if (!result.embeddings || result.embeddings.length === 0) {
      throw new Error('No se encontraron embeddings en el resultado')
   }

   embeddingPrompt = JSON.stringify(result.embeddings[0].values) || null

   
   const { data, error } = await supabase.rpc('match_documents', {
      'query_embedding': embeddingPrompt || '',
      'match_threshold': 0.4,
      'match_count': Math.ceil(Number(cant) * 2.5),
   })

   return data;
}