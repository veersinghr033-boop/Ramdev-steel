# Ramdev Steel

## Run the complete app locally

1. Install dependencies in both `ramdev-steel/` and `backend/` with `npm install`.
2. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and a `JWT_SECRET` with at least 32 characters. Keep `PORT=3001` so the Vite API proxy can reach the backend.
3. Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in `backend/.env` to use Cloudinary for image uploads. If omitted, uploads use MongoDB GridFS.
4. Ensure MongoDB is reachable, then run `npm run dev` from `ramdev-steel/`.
5. Open `http://localhost:5173` or `http://localhost:5173/admin`.

The `dev` script starts Vite and the API together. Vite forwards `/api` and `/uploads` requests to `http://127.0.0.1:3001`. Use `npm run dev:web` only when the API is already running separately.

## Deploy to Vercel

- Set Vercel's **Root Directory** to `ramdev-steel/`.
- Use `npm run build` as the build command and `dist` as the output directory.
- Add these environment variables in the Vercel project settings for every deployment environment:
  - `MONGODB_URI`
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - `JWT_SECRET` (at least 32 characters)
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `CLIENT_ORIGIN` (your deployed site origin)

The Vercel rewrite sends `/api` requests to the serverless API in this project. Leave `VITE_API_URL` unset to use the same-origin API on Vercel; do not set it to `localhost` for a production deployment.
