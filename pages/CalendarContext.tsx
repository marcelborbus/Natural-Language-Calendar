import { createContext, useState } from 'react';

export const CalendarContext = createContext<any>(null);

export function CalendarContextProvider({ children }: any) {
    const [calendar, setCalendar] = useState(null)
  
    return (
      <CalendarContext.Provider value={{ calendar, setCalendar }}>
        {children}
      </CalendarContext.Provider>
    )
  }
