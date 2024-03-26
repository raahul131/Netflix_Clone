// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQvj715yYkGtrldpIK4mg_yVcCbTz3SQs",
  authDomain: "netflixclone-89405.firebaseapp.com",
  projectId: "netflixclone-89405",
  storageBucket: "netflixclone-89405.appspot.com",
  messagingSenderId: "365547765447",
  appId: "1:365547765447:web:1c3116a8207afa3b69c8e2",
  measurementId: "G-TL1H3FRM6H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
