import { OpenAI } from "langchain/llms/openai";

const model = new OpenAI({openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0});

export default model; 
