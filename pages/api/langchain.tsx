import { OpenAI } from "langchain/llms/openai";
import { DynamicTool } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { initializeAgentExecutor } from "langchain/agents";
import moment from "moment";


//const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// export default async (req, res) => { 
// authenticate and get executor in getServerSideProps


const initializeLLMWithCalendar = async (calendar: any) => {

  const tools = [
    new DynamicTool({
      name: "setDateTime",
      description: "call this to set the date or time of an ISODateString. Input in the strictly double-quotet JSON with keys isoDate: string, unit: string and amount: int. Object is passed to moment.set.",
      func: async (args) => {
        console.log('set', args);
        
        try {
          const {isoDate, unit, amount} = JSON.parse(args);
          return moment(isoDate).set(unit, amount).toISOString();
        } catch (e) {
          return JSON.stringify(e);
        }
      }
    }),

    new DynamicTool({
      name: "relativeDatetime",
      description: "call this to get relative dates and times from \"isoDate\" by adding/subtracting time. input is JSON with keys strictly double-quoted: \"isoDate\" and \"add\" object that is passed to moment.add",
      func: async (args) => {
        console.log('add', args);
        
        try {
          const {isoDate, add} = JSON.parse(args);
          return moment(isoDate).add(add).toISOString();          
        } catch (e) {
          return JSON.stringify(e);
        }
      }
    }),

    new DynamicTool({
      name: "weekDay",
      description: "call this to get the weekday of the input. Input is an ISO Date String.",
      func: async (isoDate) => {
        console.log(isoDate);
        return moment(isoDate).format('dddd');
      }
    }),

    new DynamicTool({
      name: "getWeekday",
      description: "call this to get the ISODate of the next specified Weekday with time 0. Input is capitalized weekday as a string. Be sure to adjust the time portion of the ISODate before using other tools.",
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
        console.log('create', args);

        try {
          const input = JSON.parse(args);
          const result = calendar.addEvent(input);
          return JSON.stringify(result);
        } catch (e) {
          return JSON.stringify(e);
        }

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