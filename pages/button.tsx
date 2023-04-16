import { ChangeEvent, useState, useContext } from "react";

import { ModelContext } from './ModelContext';
import moment from "moment";

//import { OpenAI } from "langchain/llms/openai";


function Button() {
  const [response, setResponse] = useState("");
  const { agent } = useContext(ModelContext);
  
  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      if (agent === null) return;
      
      setResponse('thinking...');

      const res = await agent.call({ input: `It is ${ moment().format('dddd, YYYY-MM-DD HH:mm') }. Prompt: ${ event.target.value }` });
      setResponse(res.output);
      console.log(res)
    }
  }

  return (
    <div>
        <input
          type="text"
          onKeyDown={handleKeyDown}
        /> 
      <div>{response}</div>
    </div>
  );
}

export default Button;