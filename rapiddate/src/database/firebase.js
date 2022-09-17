import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDFeZ02JQ13ix9J-g7hwXHlmFwDE9JClvE",
    authDomain: "rapyddate.firebaseapp.com",
    databaseURL: "https://rapyddate-default-rtdb.firebaseio.com",
    projectId: "rapyddate",
    storageBucket: "rapyddate.appspot.com",
    messagingSenderId: "720906373266",
    appId: "1:720906373266:web:4c5d7eaebcd706fe643e4b",
    measurementId: "G-2PYK405W5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
// fb.StorageReference storageReference = fb.storage().refFromURL('gs://storageBucket/').child('$fileName.$extension');


