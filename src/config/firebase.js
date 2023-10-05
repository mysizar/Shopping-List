import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-s1wN3n5bZAMzaDPY8g0t49mTpT4ZC8k",
  authDomain: "shopping-list-dc532.firebaseapp.com",
  projectId: "shopping-list-dc532",
  storageBucket: "shopping-list-dc532.appspot.com",
  messagingSenderId: "326233073324",
  appId: "1:326233073324:web:98e04850bf9f17a35a2109",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
