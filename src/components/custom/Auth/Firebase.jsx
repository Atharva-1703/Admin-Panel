import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4duWjRMGxFg5txQ4u4kqOfu_OMHzyxEQ",
  authDomain: "elitequize.firebaseapp.com",
  projectId: "elitequize",
  storageBucket: "elitequize.firebasestorage.app",
  messagingSenderId: "331630025276",
  appId: "1:331630025276:web:616a630b9c896f10f0c139",
  measurementId: "G-LGP8BT9KS8" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
export const db = getFirestore(app);

export { auth };
