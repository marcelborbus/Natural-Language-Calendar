import { OpenAI } from "langchain/llms/openai";

console.log(process.env.OPENAI_KEY);

const model = new OpenAI({openAIApiKey: process.env.OPENAI_KEY, temperature: 0});

export default model; 
