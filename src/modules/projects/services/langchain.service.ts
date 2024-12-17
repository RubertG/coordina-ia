"use server"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { WorkersService } from "@/modules/workers";
import { ProjectsService } from "./projects.service";


export async function LangChainService() {
   const llm = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      temperature: 0,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
   });

   const systemTemplate = `VERY IMPORTANT: You should only return the id of the users who are the best, no additional
   information. Act as an expert in the formation of software development teams, especially in teams that handle {techs}
   technologies. You will receive a data structure that has employee information such as id, curriculum and name.`;

   const humanTemplate = `According to the following list of workers: {workers} , analyze each curriculum and choose
   the {cant} best members who can form a development team that has the following description: {desc}`;

   const chatTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", humanTemplate]
   ]);
   let rawData;
   let result = [];
   const parser = new JsonOutputParser();
   const chain = llm.pipe(parser)

   const wor = await WorkersService.getWorkers();
   const pro = await ProjectsService.getProject("456e51e7-928b-4473-8183-b313da0d2747");

   if(pro.data && wor.data){
      const rta = await chatTemplate.invoke({
         techs: pro.data[0].tecnologias,
         workers: wor.data,
         cant: 10,
         desc: pro.data[0].descripcion
      });

      rawData = await chain.invoke(rta)
   }
   
   if (rawData && Array.isArray(rawData)) {
      result = rawData.map((id) => id.toString());
   }

   return result;
}