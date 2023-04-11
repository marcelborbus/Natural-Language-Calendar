import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

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
  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
    </div>
  );
};

export default Calendar;
