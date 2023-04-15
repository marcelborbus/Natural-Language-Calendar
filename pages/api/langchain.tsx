import { OpenAI } from "langchain/llms/openai";
import { DynamicTool } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { initializeAgentExecutor } from "langchain/agents";


//const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// export default async (req, res) => { 
// authenticate and get executor in getServerSideProps


const initializeLLMWithCalendar = async (calendar: any) => {

  const addEvent = async (args: string): Promise<string> => {
    const result = calendar.addEvent(JSON.parse(args));
    return JSON.stringify(result);
  };

  const tools = [
    new Calculator(),
  
    new DynamicTool({
      name: "createEvent",
      description: "call this to create a FullCalendar event with the event in JSON with \" as the argument",
      func: addEvent,
    }),
  
    new DynamicTool({
      name: "delteteEvent",
      description:
        "call this to delete a FullCalendar event with the event in json as the argument",
      func: async (event) => "deleteEvent, " + JSON.stringify(event),
    }),
  ]
  
  const model = new OpenAI({ openAIApiKey: "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", temperature: 0 });
  
  const agent = await initializeAgentExecutor(
    tools,
    model,
    "zero-shot-react-description",
  );

  return agent;
};

export default initializeLLMWithCalendar;


//export default executor;

// res.status(200).json({ data: "your response data here" });
// };