import { createContext, useState } from 'react';

export const CalendarContext = createContext<any>({ _calendar: null, _setCalendar: null });

export default function CalendarContextProvider({ children }: any) {
    const [calendar, setCalendar] = useState(null)
  
    return (
      <CalendarContext.Provider value={{ calendar, setCalendar }}>
        {children}
      </CalendarContext.Provider>
    )
  }
