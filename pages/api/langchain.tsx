import { OpenAI } from "langchain/llms/openai";
import { DynamicTool } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { initializeAgentExecutor } from "langchain/agents";
import moment from "moment";


//const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// export default async (req, res) => { 
// authenticate and get executor in getServerSideProps


const initializeLLMWithCalendar = async (calendar: any) => {

  const addEvent = async (args: string): Promise<string> => {
    const result = calendar.addEvent(JSON.parse(args));
    return JSON.stringify(result);
  };


  // calendar.getDate()
  // calendar.incrementDate()

  const tools = [
    new DynamicTool({
      name: "currentDatetime",
      description: "call this to get the current date and time. No input needed.",
      func: async () => moment().utcOffset(120).toISOString(), // change for other countries
    }),

    new DynamicTool({
      name: "currentYear",
      description: "call this if you are prompted without a specific year, because you should always assume current year then. No input. Be sure to call this tool first!",
      func: async () => moment().utcOffset(120).format('YYYY'), // change for other countries
    }),

    new DynamicTool({
      name: "relativeDatetime",
      description: "call this to get relative dates and times from \"isoDate\" by adding/subtracting time. input is JSON with keys strictly double-quoted: \"isoDate\" and \"add\" object that is passed to moment.add",
      func: async (args) => {
        const {isoDate, add} = JSON.parse(args);
        console.log(args);
        // const addition = JSON.parse(args);
        return moment(isoDate).utcOffset(120).add(add).toISOString();
      }
    }),

    new DynamicTool({
      name: "weekDay",
      description: "call this to get the weekday of the input. Input is an ISO Date String. If input is empty, it will return the current weekday.",
      func: async (isoDate) => {
        if (isoDate === '') return moment().utcOffset(120).format('dddd');
        console.log(isoDate);
        return moment(isoDate).format('dddd');
      }
    }),

    new DynamicTool({
      name: "getWeekday",
      description: "call this to get the ISODate of the next specified Weekday with time 0. Input is capitalized weekday as a string. Prioritize over currentDateTime. Be sure to adjust the time portion of the ISODate before using other tools.",
      func: async (weekday) => {
        const today = moment().utcOffset(120);

        for (let i = 1; i <= 7; i++) {
          let comp = today.add(1, 'days');
          if (comp.format('dddd') === weekday) return comp.startOf('day').toISOString();
        }

        return 'Error';
      }
    }),
  
    new DynamicTool({
      name: "createEvent",
      description: "call this to create a FullCalendar event whith the event in JSON and the keys in double quotes! Use the other tools first to get the right start and end dates. Dont use relativeDatetime to set times.",
      func: async (args: string): Promise<string> => {
        console.log(args);
        const result = calendar.addEvent(JSON.parse(args));
        return JSON.stringify(result);
      }
    }),

    // find event, edit event, delete event
  
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