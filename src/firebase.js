import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXG7z_vIUZfs23uMPhpUPPZFq0UisSkU0",
  authDomain: "news-499d1.firebaseapp.com",
  projectId: "news-499d1",
  storageBucket: "news-499d1.appspot.com",
  messagingSenderId: "1063638375446",
  appId: "1:1063638375446:web:aa2940787e167e39212937",
  measurementId: "G-T2NRLWD1LH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc, getDoc };
