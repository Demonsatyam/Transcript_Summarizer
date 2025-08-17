# 📄 Transcript Summarizer

A web-based application that lets users **upload or paste transcripts** (meetings, lectures, events) and automatically **generate concise summaries** using **Google Gemini AI**.

The project integrates **Next.js frontend**, **Firebase backend**, and **Google AI APIs** into a seamless summarization tool.

---

## 🚀 Features
- 🔐 **Authentication** – Firebase Auth (Email/Password + Google login)
- 📝 **Upload transcripts** – Paste transcript text with title
- 🤖 **Automatic summarization** – Powered by Google Gemini API
- 📊 **Dashboard** – View transcripts and summaries
- 🎯 **Custom prompts** – Focus summaries on deadlines, action items, etc.
- ☁️ **Cloud-first infra** – Firebase Functions + Firestore + Storage

---

## 🏗️ Architecture

+-------------------+ +------------------------+
| Next.js Frontend | ---> | Firebase Functions API |
| (React + TS) | | (Node.js, Express) |
+---------+---------+ +-----------+------------+
| |
v v
+-------------------+ +---------------------+
| Firebase Auth | | Firestore DB |
| (Login/Signup) | | (Transcripts & Summ)|
+-------------------+ +---------------------+
| |
v v
+-------------------------------------------------------+
| Google AI (Gemini API / Vertex AI) – Summarization |
+-------------------------------------------------------+


---

## ⚙️ Tech Stack

### 🔹 Frontend
- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- Firebase SDK for Auth

### 🔹 Backend
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
- [Express.js](https://expressjs.com/)
- Firebase Emulator Suite for local dev

### 🔹 Database & Auth
- [Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Auth](https://firebase.google.com/docs/auth)

### 🔹 AI
- [Google Gemini Pro](https://ai.google.dev) (text summarization)

---

## 🔑 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/transcript-summarizer.git
cd transcript-summarizer

2. Install dependencies
npm install

3. Firebase setup
firebase init functions firestore storage auth

4. Environment variables

Create a .env.local in /src for frontend:

NEXT_PUBLIC_API_BASE=http://127.0.0.1:5001/transcript-summarizer-xxxx/region/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxx


Backend .env:

GOOGLE_API_KEY=your_google_ai_key

5. Run backend emulators
cd backend
npm run serve

6. Run frontend
cd ..
npm run dev

🔄 Development Process

Setup Firebase project (firebase init)

Implement auth (login/signup with Firebase SDK)

Build backend API endpoints:

POST /transcripts.create

POST /transcripts.summarize

POST /auth/ensure-profile

Integrate Gemini API for summarization

Connect frontend upload form → backend

Add dashboard for managing transcripts

Test with Firebase Emulator Suite

⚡ Challenges & Solutions

CORS issues → fixed by adding LAN/localhost origins in Express CORS middleware

Failed to fetch errors → used 127.0.0.1 for emulators instead of LAN IP

Auth tokens → attached Firebase idToken in all API requests

Firestore rules → set basic read/write rules for dev; production needs security rules

📈 Future Improvements

📂 File Upload (PDF, DOCX → auto text extraction)

🗣️ Multi-language summarization

📤 Export summaries (PDF, email, share link)

👥 Team collaboration (shared transcripts)

🔍 Advanced summarization modes (bullets, action items, deadlines)

✅ Conclusion

The Transcript Summarizer showcases how Firebase + Next.js + Google AI can build a scalable AI-powered productivity app.
It demonstrates secure auth, serverless backend, real-time database, and LLM-powered summarization in one cohesive project.