import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",

  authDomain: "mobile-programming-bsit.firebaseapp.com",

  projectId: "mobile-programming-bsit",

  storageBucket: "mobile-programming-bsit.firebasestorage.app",

  messagingSenderId: "722270584693",

  appId: "1:722270584693:web:7a5cba67ced0ed2fbc1d3c",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
