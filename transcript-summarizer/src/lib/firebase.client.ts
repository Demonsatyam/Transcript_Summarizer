import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Debug log (browser console). Safe to leave during dev.
if (typeof window !== "undefined") {
  // Mask the key, just in case
  const masked = (cfg.apiKey || "").slice(0, 6) + "…";
  console.log("Firebase cfg:", {
    apiKey: masked,
    projectId: cfg.projectId,
    messagingSenderId: cfg.messagingSenderId,
    appId: cfg.appId,
  });
}

// Hard guard: MUST be your project number
if (!cfg.appId?.startsWith("1:735499759894:")) {
  throw new Error(
    `Wrong Firebase config loaded. Expected appId to start with 1:735499759894:, got ${cfg.appId}. ` +
    "Check transcript-summarizer/.env.local."
  );
}



const app = getApps().length ? getApps()[0] : initializeApp(cfg);
export const auth = getAuth(app);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getAdditionalUserInfo,
} from "firebase/auth";
