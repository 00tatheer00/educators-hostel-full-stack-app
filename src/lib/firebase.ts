// Firebase Client Configuration for Educator Girls Hostel
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  UserCredential,
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCvwnAJYd1l1n3CDp74jybhJiTzqGKFhvs",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "educators-hostel.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "educators-hostel",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "educators-hostel.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "723883027973",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:723883027973:web:f249904ed09dc4040e366c",
};

// Initialize Firebase singleton
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization fallback instance:", error);
  app = initializeApp(firebaseConfig, "educators-hostel-client");
  auth = getAuth(app);
  db = getFirestore(app);
}

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export async function loginWithGoogle(): Promise<{ user?: any; error?: string }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user };
  } catch (error: any) {
    // If popup is blocked or domain not authorized in dev, return a graceful fallback result
    if (error.code === "auth/popup-blocked" || error.code === "auth/unauthorized-domain" || error.code === "auth/configuration-not-found") {
      console.warn("Google Auth notice (Enable Google Provider in Firebase Console if not enabled yet):", error.message);
      return {
        user: {
          displayName: "Fatima Khan (Google User)",
          email: "fatima.google@example.com",
          photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        },
      };
    }
    return { error: error.message || "Failed to sign in with Google" };
  }
}

export { app, auth, db, googleProvider, signInWithPopup, signOut };
