
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyB-RaR66ndsbvqZt1bnn2MXUJ-IAkc_xVI",
  authDomain: "tourmate-c95ff.firebaseapp.com",
  projectId: "tourmate-c95ff",
  storageBucket: "tourmate-c95ff.firebasestorage.app",
  messagingSenderId: "240132390025",
  appId: "1:240132390025:web:c7802e1ebd4f594f44da58",
  measurementId: "G-PK60CDGETD"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); 
export { auth, db };
