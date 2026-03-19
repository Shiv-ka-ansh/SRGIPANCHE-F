# PANACHE 2K26 — Deployment Guide

## Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Gmail App Password (for email sending)

---

## 1. Backend Setup

```bash
cd server
cp .env.example .env
# Edit .env with your actual values (MongoDB URI, JWT secret, email creds, etc.)
npm install
npx tsx seed.ts    # Creates superadmin + test admin
npm run dev        # Starts dev server on port 4000
```

### Deploy Backend (Railway / Render)
1. Push the `server/` folder to a Git repo (or use monorepo)
2. On Railway/Render, create a new service pointing at the `server/` directory
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm run dev` (or `npm start` after building)
5. Add all env vars from `.env.example`
6. After deploy, run the seed: `npx tsx seed.ts` via the Railway shell

---

## 2. Frontend Setup

```bash
cd panache-2k26   # root frontend folder
npm install
```

Create `.env`:
```
VITE_API_URL=http://localhost:4000/api
```

For production, set `VITE_API_URL` to your deployed backend URL (e.g. `https://panache-api.up.railway.app/api`).

```bash
npm run dev   # Starts Vite dev server on port 3000
npm run build # Production build
```

### Deploy Frontend (Vercel)
1. Push root folder to GitHub
2. Import repo on Vercel
3. Set **Root Directory**: `.` (or `panache-2k26` if nested)
4. Set **Build Command**: `npm run build`
5. Set **Output Directory**: `dist`
6. Add env var: `VITE_API_URL=https://your-backend-url.com/api`
7. `vercel.json` already handles SPA rewrites

---

## 3. Seeded Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@panache.com | SuperSecurePass123 |
| Test Admin | admin@panache.com | Admin@123 |

---

## 4. NPM Packages

### Frontend
```
react, react-dom, react-router-dom, axios, react-hot-toast,
framer-motion (motion), lucide-react, tailwindcss, @tailwindcss/vite,
clsx, tailwind-merge, date-fns, qrcode.react
```

### Backend
```
express, mongoose, cors, dotenv, jsonwebtoken, bcryptjs,
nodemailer, json2csv, exceljs, zod
```
Dev: `tsx, typescript, @types/*`

---

## 5. Gotchas
- **Gmail SMTP**: Use an App Password, not your Google account password. Go to Google Account → Security → 2FA → App Passwords.
- **CORS**: Make sure `ALLOWED_ORIGINS` includes both your local dev URL and production Vercel URL.
- **MongoDB Atlas**: Whitelist your server IP (or use `0.0.0.0/0` for dev).
- **Token lookup**: Plaintext tokens are stored in an indexed field for fast admin lookup. The bcrypt hash is kept as a backup.
- **Email failures are non-blocking**: Registration still succeeds even if the email fails to send.
