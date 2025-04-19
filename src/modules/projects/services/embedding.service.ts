import { GoogleGenAI } from '@google/genai'
import { createClientClient } from '@/modules/core'

// Despues de guardar un trabajador en la base de datos, se llama para guardar sus embeddings en otra tabla
export async function embeddingWorker(idWorker: string, cvText: string) {
  let registro: { id: string; id_chunk: number; texto_chunk: string; embedding: string | null } = {
    id: '',
    id_chunk: 0,
    texto_chunk: '',
    embedding: null,
  }
  const supabase = createClientClient()
  let chunks = chunkCvBySection(cvText)
  const llm = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  })

  for (let i = 0; i < chunks.length; i++) {
    const chunkText = chunks[i]

    const result = await llm.models.embedContent({
      model: 'text-embedding-004',
      contents: chunkText,
      config: {
        taskType: 'RETRIEVAL_DOCUMENT',
      },
    })

    if (!result.embeddings || result.embeddings.length === 0) {
      throw new Error('No se encontraron embeddings en el resultado')
    }

    registro = {
      id: idWorker,
      id_chunk: i,
      texto_chunk: chunkText,
      embedding: JSON.stringify(result.embeddings[0].values) || null,
    }

    // console.log(registro);
    const { error } = await supabase.from('Embed_Trabajador').insert([registro])
  }
}

function chunkCvBySection(text: string): string[] {
  let sections: string[] = []
  let currentSection = ''

  const lines = text.split('\n')
  for (let line of lines) {
    line = line.trim()
    if (line === '') continue // Skip empty lines

    if (['Summary', 'Highlights', 'Experience', 'Skills'].some((header) => line.startsWith(header))) {
      if (currentSection) {
        sections.push(currentSection.trim()) // Add the previous section to the list
      }
      currentSection = line // Start a new section
    } else {
      currentSection += ' ' + line // Append to the current section
    }
  }

  if (currentSection) {
    sections.push(currentSection.trim()) // Add the last section to the list
  }

  if (sections.length > 1) {
    sections[0] = sections[0] + '\n\n' + sections[1]
    sections.splice(1, 1)
  }

  return sections
}
