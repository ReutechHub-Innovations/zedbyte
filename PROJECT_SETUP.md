# ZEDBYTES SOLUTIONS — Project Setup (Node.js + MERN + Render/Vercel)

This repo contains a **MERN stack** application:
- **Frontend**: `client/` (React + Tailwind-compatible CSS + Axios)
- **Backend**: `server/` (Node.js + Express + MongoDB + Cloudinary)

---

## 1) Local Development (Install Dependencies)

### Prerequisites
- Node.js (LTS recommended)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image/video uploads)

### Backend (server)
```bash
cd zedbytes-solutions/server
npm install
```

### Frontend (client)
```bash
cd zedbytes-solutions/client
npm install
```

---

## 2) Local Development (Run via Node.js)

### Backend
Create environment variables first (see Section 3).

Run (development):
```bash
cd zedbytes-solutions/server
npm run dev
```

Or run (production-style):
```bash
cd zedbytes-solutions/server
npm start
```

> Backend runs by default on **http://localhost:5000**.

### Frontend
Run:
```bash
cd zedbytes-solutions/client
npm start
```

> Frontend runs by default on **http://localhost:3000**.

---

## 3) Environment Variables (Backend)

The backend expects env vars. Example is provided at:
- `server/.env.example`

Copy it to create your local env file:
```bash
cd zedbytes-solutions/server
copy .env.example .env
```

Then fill in values:
- `MONGODB_URI` (MongoDB Atlas or local Mongo)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `JWT_SECRET`
- `PORT` (optional; defaults to 5000)

> Note: The repo also has `server/src/config/cloudinary.js` reading Cloudinary vars.

---

## 4) Environment Variables (Frontend)

Frontend uses:
- `REACT_APP_API_URL` from env (with fallback `http://localhost:5000/api`)

For local dev, you can set it when starting:
```bash
cd zedbytes-solutions/client
set REACT_APP_API_URL=http://localhost:5000/api
npm start
```

(Windows `set` syntax; for PowerShell use `$env:REACT_APP_API_URL="http://localhost:5000/api"`.)

---

## 5) Deploy Frontend on Vercel

### Recommended: Build & Deploy as a Static React App
1. In Vercel, create a new Project:
   - Connect Git repository
2. Set **Build Command**:
   - `cd client && npm run build`
3. Set **Output Directory**:
   - `client/build`
4. Set **Environment Variables** (Vercel → Project Settings → Environment Variables):
   - `REACT_APP_API_URL` = your Render backend URL (including `/api`)
     - Example: `https://your-render-backend.onrender.com/api`

### Vercel Build/Start Notes
- Frontend build uses CRA:
  - `npm run build`

---

## 6) Deploy Backend on Render

### Create a Render Web Service
1. In Render, create **New Web Service**
2. Choose the Git repository and branch
3. Set **Environment**:
   - Build Command:
     - `cd server && npm install && npm run build` (if you have a build step)
   - Start Command:
     - `cd server && npm start`

> This backend currently uses `server/src/index.js` directly. If there is no build step, you can omit it and simply use `npm start`.

### Render Environment Variables
Add these in Render → Service → Environment:
- `NODE_ENV` = `production`
- `PORT` = (Render provides a port automatically; optional)
- `MONGODB_URI` = your MongoDB Atlas connection string
- `JWT_SECRET` = a strong random secret
- Cloudinary variables:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

### Important: API Routes
Backend mounts routes under:
- `/api/auth`
- `/api/admin`
- `/api/content`

So frontend should call:
- `REACT_APP_API_URL` = `<render-service-url>/api`

---

## 7) Quick Verification (After Deploy)

1. Confirm Render backend is reachable:
   - `https://your-render-backend.onrender.com/api`
2. Confirm Vercel frontend can fetch data.
3. Test auth flow:
   - Login/register should return tokens (JWT)
4. Test Cloudinary uploads:
   - Upload endpoint should save media.

---

## 8) Recommended Git Practices
- Never commit secrets (`.env`, JWT secrets, Cloudinary API keys)
- This repo includes `.env.example` files only.

