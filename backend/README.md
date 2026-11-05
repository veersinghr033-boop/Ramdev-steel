# Ramdev Steel backend API

## Local setup

1. Install root dependencies: `npm install`.
2. Copy `backend/.env.example` to `backend/.env`.
3. Set a MongoDB URI, unique admin credentials, and a random `JWT_SECRET` of 32+ characters.
4. Start MongoDB locally or provide a MongoDB Atlas URI.
5. Run `npm run dev:full` at the repository root.
6. Open `http://localhost:5173/admin` and sign in with the configured admin account.

The first successful **Save & publish** writes all bundled site data into MongoDB. Until then, the public site uses its bundled defaults. Public content reads are open; content updates and image management require the admin-only, HTTP-only session cookie. There is no public admin registration endpoint.

Backend layers are separated into `routes`, `controllers`, `services`, `models`, `middleware`, and `config` under `backend/src`. Images upload to `backend/uploads` and are served from `/uploads`.

## Production

Serve the built Vite site and `/api` plus `/uploads` on the same origin, or configure a secure same-origin reverse proxy. Set `NODE_ENV=production` and the exact `CLIENT_ORIGIN`. Local disk image storage is for development/single-instance hosting only; use persistent volume or object storage for ephemeral/multi-instance deployments. Back up MongoDB and uploaded image storage separately.
