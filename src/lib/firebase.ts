import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQ6C7MQ2icxND_GlXSb-c8Y7QMaejoTH8",
  authDomain: "nextroundprep-28c1b.firebaseapp.com",
  projectId: "nextroundprep-28c1b",
  storageBucket: "nextroundprep-28c1b.firebasestorage.app",
  messagingSenderId: "724909095311",
  appId: "1:724909095311:web:b7763dd367da22c0f3f3fa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-nextroundprep-db8bcb77-b2dc-45fb-998d-1a42a8998e9d");
export const storage = getStorage(app);
