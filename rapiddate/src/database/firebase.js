import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDFeZ02JQ13ix9J-g7hwXHlmFwDE9JClvE",
    authDomain: "rapyddate.firebaseapp.com",
    projectId: "rapyddate",
    storageBucket: "1:720906373266:web:4c5d7eaebcd706fe643e4b",
    messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


