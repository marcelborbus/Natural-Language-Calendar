import { OpenAI } from "langchain/llms/openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const model = new OpenAI({ openAIApiKey: "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", temperature: 0 });
export default model;

/*

tools:
  1. momentjs
  2. calculator
  3. RRULES
  4. search, edit, create, delete

*/
