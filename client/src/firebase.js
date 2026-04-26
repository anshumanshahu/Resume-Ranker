import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "XXXXX",
  authDomain: "XXXXX",
  projectId: "XXXXX",
  storageBucket: "XXXXX",
  messagingSenderId: "XXXXX",
  appId: "XXXXX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);