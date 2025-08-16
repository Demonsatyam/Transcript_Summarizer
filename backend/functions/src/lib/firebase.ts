import * as admin from "firebase-admin";

if (!admin.apps.length) {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Use local service account
    admin.initializeApp({
      credential: admin.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
    });
  } else {
    // Default (production, GCP environment)
    admin.initializeApp();
  }
}

export const db = admin.firestore();
export const auth = admin.auth();