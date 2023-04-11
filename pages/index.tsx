import { useState, useEffect, FormEvent } from 'react';
import Head from 'next/head';
import { doc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

import db from './api/firebase';
import Calendar, { Event } from './calendar'

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const fetchedEvents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !start || !end) {
      return;
    }
    const docRef = await addDoc(collection(db, 'events'), {
      title,
      start,
      end,
    });
    setEvents([...events, { id: docRef.id, title, start, end }]);
    setTitle('');
    setStart('');
    setEnd('');
  };

  const handleDeleteEvent = async (id: string) => {
    await deleteDoc(doc(collection(db, 'events'), id));
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div>
      <Head>
        <title>Natural Language Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Natural Language Calendar</h1>

        <form onSubmit={handleCreateEvent}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Start:
            <input
              type="text"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </label>
          <label>
            End:
            <input
              type="text"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </label>
          <button type="submit">Create event</button>
        </form>

        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.title} - {event.start} to {event.end}
              <button onClick={() => handleDeleteEvent(event.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

        <Calendar events={events} />
        
      </main>
    </div>
  );
}
