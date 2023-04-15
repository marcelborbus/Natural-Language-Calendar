import { useState } from "react";

import model from './api/langchain'
//import { OpenAI } from "langchain/llms/openai";

function Button() {
  const [response, setResponse] = useState("");

  const handleClick = async () => {
    const res = await model.call("What would be a good company name a company that makes colorful socks?");
    setResponse(res);
  };

  return (
    <div>
      <button onClick={handleClick}>Make Request</button>
      <div>{response}</div>
    </div>
  );
}

export default Button;