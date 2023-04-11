import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA47dei-R-PZSRihoqc3KBqEPE0V9drYic",
  authDomain: "natural-language-calendar.firebaseapp.com",
  projectId: "natural-language-calendar",
  storageBucket: "natural-language-calendar.appspot.com",
  messagingSenderId: "1086819826942",
  appId: "1:1086819826942:web:23f79ef07dbc6577b839af",
  measurementId: "G-Y3L50SCJSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;