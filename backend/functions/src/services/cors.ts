import cors from "cors";

const allowed = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:9002",
  "http://127.0.0.1:9002",
  "http://192.168.43.139:9002", // <-- your Next dev URL
]);

export const useCors = cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowed.has(origin)) return cb(null, true);

    // optional: allow any LAN :9002 during dev
    const ok =
      /^http:\/\/192\.168\.\d+\.\d+:9002$/i.test(origin) ||
      /^http:\/\/10\.\d+\.\d+\.\d+:9002$/i.test(origin);
    if (ok) return cb(null, true);

    return cb(new Error("Not allowed by CORS: " + origin));
  },
  credentials: true,
});
