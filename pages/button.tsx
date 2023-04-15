import { ChangeEvent, useState, useContext } from "react";

import { ModelContext } from './ModelContext';

//import { OpenAI } from "langchain/llms/openai";

function Button() {
  const [response, setResponse] = useState("");
  const { agent } = useContext(ModelContext);
  
  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      if (agent === null) return;
      
      const res = await agent.call({ input: event.target.value });
      setResponse(res.output);
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