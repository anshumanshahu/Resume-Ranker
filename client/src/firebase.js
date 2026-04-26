import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDpprN1MJ6f5qnJ-ZAbrqT2ry-bPUTeV6Q",
  authDomain: "resumeranker-bcd09.firebaseapp.com",
  projectId: "resumeranker-bcd09",
  storageBucket: "resumeranker-bcd09.firebasestorage.app",
  messagingSenderId: "42977515549",
  appId: "1:42977515549:web:5aefce5645524b38590ef4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// IMPORTANT: export auth
export const auth = getAuth(app);