import { OpenAI } from "langchain/llms/openai";

//const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
//const OPENAI_API_KEYs = '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';
console.log(process.env.OPENAI_API_KEY)

const model = new OpenAI({openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0});

export default model; 
