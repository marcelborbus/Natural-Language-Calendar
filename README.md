# Natural Language Calendar

Dies ist ein Portfolioprojekt, welches es ermöglicht seinen Kalender über die Sprache zu bedienen. Dies wird ermöglicht, indem ein LLM (GPT-4) Zugriff auf  Kalenderfunktionen bekommt. Genutzte tools:
- Next.js als frontend mit FullCalendar.js
- Firestore als Datenbank
- langchain für den LLM-Agent

Diese App soll im alltag Zeit sparen und Spaß machen zu programmieren!

## Features

![](https://i.imgur.com/S71ltCU.gif)

- Talk to your calendar!
- Erstelle/Bearbeite/Lösche deine Events von überall mit natürlicher Sprache.

## Architektur

![](https://i.imgur.com/fy2vXe9.png)

## Getting Started

First fill in the API keys for Firebase & OpenAI
Then, run the development server:

```bash
npm run build
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
