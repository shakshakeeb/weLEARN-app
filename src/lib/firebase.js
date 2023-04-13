import { initializeApp }from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCA_GEUBp_e3iQgZT2g5UKYg0pBXLM8-nI",
    authDomain: "chatbot-jqem.firebaseapp.com",
    projectId: "chatbot-jqem",
    storageBucket: "chatbot-jqem.appspot.com",
    messagingSenderId: "550052892033",
    appId: "1:550052892033:web:7f562c97976d99fa66ec80",
    measurementId: "G-NN1RKZ374T"
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);















