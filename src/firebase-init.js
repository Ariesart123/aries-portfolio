import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig, firebaseConfigured } from "./firebase-config.js";

// Note: Firebase Storage isn't used — media uploads go through
// Cloudinary instead (see cloudinary-config.js).

export const app = firebaseConfigured ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;
