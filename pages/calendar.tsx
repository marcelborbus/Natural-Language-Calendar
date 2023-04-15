import React, {useRef, useContext, useState, createContext, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { CalendarContext } from './CalendarContext';
import { ModelContext } from './ModelContext';
import initializeLLMWithCalendar from './api/langchain'

interface Props {
  events: Event[];
}

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
}

const Calendar = ({ events }: Props) => {
  const calendarRef = useRef<any>(null);
  const { setCalendar } = useContext(CalendarContext);
  const { setAgent } = useContext(ModelContext);

  /*const handleMount = async () => {
    console.log('mounting...')
    const calendar = calendarRef.current.getApi();
    setCalendar(calendar);
    console.log(calendar)

    const agent = await initializeLLMWithCalendar(calendar);
    setAgent(agent);
  };*/
  
  useEffect(() => {(async () => {
    const calendar = calendarRef.current.getApi();
    setCalendar(calendar);

    const agent = await initializeLLMWithCalendar(calendar);
    setAgent(agent);
  })()}, [])

  return (
    <>
      <FullCalendar 
        ref={calendarRef} 
        plugins={[dayGridPlugin]} 
        initialView="dayGridMonth" 
        events={events} 
        //eventDidMount={handleMount}
      />
    </>
  );
};

export default Calendar;
