import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// doc https://firebase.google.com/docs/database/web/read-and-write#web-modular-api_2

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "cocktales-eight.vercel.app",
  databaseURL: process.env.NEXT_PUBLIC_BASE_URL,
  projectId: "cocktales-23d15",
  storageBucket: "cocktales-23d15.appspot.com",
  messagingSenderId: "681439086589",
  appId: "1:681439086589:web:9264243ca8339b1341fb94",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);