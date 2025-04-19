import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { JsonOutputParser } from '@langchain/core/output_parsers'

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

export async function spanishToEnglish() {

}