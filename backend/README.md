# Ramdev Steel backend API

## Local setup

1. Install frontend dependencies from `ramdev-steel/` with `npm install`.
2. Install backend dependencies from `backend/` with `npm install` (this installs Nodemon).
3. Copy `backend/.env.example` to `backend/.env`.
4. Set a MongoDB URI, unique admin credentials, and a random `JWT_SECRET` of 32+ characters.
5. Start MongoDB locally or provide a MongoDB Atlas URI.
6. From `ramdev-steel/`, run `npm run dev:full`. Nodemon watches backend source files and restarts the API when they change.
7. Open `http://localhost:5173/admin` and sign in with the configured admin account.

To run only the API, use `npm run dev` from `backend/`. For production, install backend dependencies and use `npm start` from `backend/`.

The first successful **Save & publish** writes all bundled site data into MongoDB. Until then, the public site uses its bundled defaults. Public content reads are open; content updates and image management require the admin-only, HTTP-only session cookie. There is no public admin registration endpoint.

Backend layers are separated into `routes`, `controllers`, `services`, `models`, `middleware`, and `config` under `backend/src`. Site content is stored in MongoDB, and uploaded image binaries are stored in MongoDB GridFS and served from `/uploads`. On startup, existing files in `backend/uploads` are migrated into GridFS and removed from the local folder after successful storage.

## Production

Serve the built Vite site and `/api` plus `/uploads` on the same origin, or configure a secure same-origin reverse proxy. Set `NODE_ENV=production` and the exact `CLIENT_ORIGIN`. Back up MongoDB to preserve both site content and uploaded images; GridFS stores image files in the `siteImages.files` and `siteImages.chunks` collections.
