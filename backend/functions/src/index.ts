// backend/functions/src/index.ts
import express, { Request, Response, NextFunction, RequestHandler } from "express";
import corsLib from "cors";
import * as admin from "firebase-admin";

// --- Firebase Functions v2 imports (region + export) ---
import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2/options";

/* ---------------------- Global options ---------------------- */
// Set your region once here (fixes the “region” error)
setGlobalOptions({ region: "asia-south1" });

/* ---------------------- Admin SDK init ---------------------- */
if (!admin.apps.length) {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const svc = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    admin.initializeApp({ credential: admin.credential.cert(svc) });
    console.log("Admin initialized with local service account JSON.");
  } else {
    admin.initializeApp();
    console.log("Admin initialized with application default credentials.");
  }
}

const auth = admin.auth();
const db = admin.firestore();

/* --------------------------- Express ------------------------ */
const app = express();

/* ---------------------------- CORS -------------------------- */
const allowed = new Set<string>([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:9002",
  "http://127.0.0.1:9002",
  "http://192.168.43.139:3000",
  "http://192.168.43.139:9002",
]);

const cors = corsLib({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowed.has(origin)) return cb(null, true);
    if (
      /^http:\/\/192\.168\.\d+\.\d+:(3000|9002)$/i.test(origin) ||
      /^http:\/\/10\.\d+\.\d+\.\d+:(3000|9002)$/i.test(origin)
    ) {
      return cb(null, true);
    }
    cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
});
app.use(cors);
app.use(express.json());

/* ---------------------- Auth middleware --------------------- */
// Type explicitly as RequestHandler to avoid TS complaints
const requireAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hdr = req.header("Authorization") || "";
    const m = hdr.match(/^Bearer\s+(.+)$/i);
    if (!m) {
      res.status(401).json({ error: "Missing Bearer token" });
      return;
    }
    const idToken = m[1];
    const decoded = await auth.verifyIdToken(idToken);
    (req as any).uid = decoded.uid;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

/* ---------------------------- Routes ------------------------ */

// Health
app.get("/admin/health", (_req: Request, res: Response) => {
  res.json({ ok: true, ts: Date.now() });
});

// Ensure Firestore profile (call after client login/signup)
app.post("/auth/ensure-profile", requireAuth, async (req: Request, res: Response) => {
  try {
    const uid = (req as any).uid as string;
    const userRec = await auth.getUser(uid);

    const userRef = db.collection("users").doc(uid);
    const snap = await userRef.get();

    if (!snap.exists) {
      await userRef.set({
        email: userRec.email ?? null,
        provider: userRec.providerData?.[0]?.providerId ?? "unknown",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    res.json({ ok: true });
  } catch (err: any) {
    console.error("ensure-profile error:", err);
    res.status(500).json({ error: err?.message ?? "Internal error" });
  }
});

// Current user info
app.get("/auth/me", requireAuth, async (req: Request, res: Response) => {
  try {
    const uid = (req as any).uid as string;
    const userRec = await auth.getUser(uid);
    res.json({
      uid,
      email: userRec.email ?? null,
      providers: userRec.providerData?.map((p) => p.providerId) ?? [],
    });
  } catch (err: any) {
    console.error("me error:", err);
    res.status(500).json({ error: err?.message ?? "Internal error" });
  }
});

/* ---------------------------- Export ------------------------ */
// v2 style export; region already set above with setGlobalOptions
export const api = onRequest(app);
