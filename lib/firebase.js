import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const isServer = typeof window === "undefined"; // ⬅️ Tambahkan ini

const firebaseConfig = {
  apiKey: isServer
    ? process.env.FIREBASE_API_KEY
    : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: isServer
    ? process.env.FIREBASE_AUTH_DOMAIN
    : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: isServer
    ? process.env.FIREBASE_PROJECT_ID
    : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: isServer
    ? process.env.FIREBASE_STORAGE_BUCKET
    : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: isServer
    ? process.env.FIREBASE_MESSAGING_SENDER_ID
    : process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: isServer
    ? process.env.FIREBASE_APP_ID
    : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
