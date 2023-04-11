import { OpenAI } from "langchain/llms";




// export default res;

export default async function getStaticProps() {
    OpenAI
    fs
    const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0 });

const res = await model.call(
    "What would be a good company name a company that makes colorful socks?"
);
  
console.log(res);
    return { props: { msg: res } }
  }