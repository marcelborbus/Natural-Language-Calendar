import { AgentExecutor } from 'langchain/agents';
import { createContext, Context, useState } from 'react';

export const ModelContext = createContext<any>({_agent: null, _setAgent: null});

export default function ModelContextProvider({ children }: any) {
    const [agent, setAgent] = useState<AgentExecutor | null>(null)
  
    return (
      <ModelContext.Provider value={{ agent, setAgent }}>
        {children}
      </ModelContext.Provider>
    )
  }
