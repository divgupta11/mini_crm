# Mini CRM

A full-stack Mini CRM web app inspired by Zoho CRM. It includes JWT authentication, protected lead management APIs, and a responsive React dashboard for creating, editing, deleting, and filtering leads.

## Tech Stack

- Frontend: React.js, React Router, Axios, CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JWT with bcrypt password hashing

## Project Structure

```text
mini_crm/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
  frontend/
    src/
      api/
      components/
      context/
      pages/
      utils/
```

## Environment Variables

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/mini_crm
JWT_SECRET=******************************
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Vercel Deployment

This repo is configured for a single Vercel project:

- Frontend: Vite static build from `frontend/`
- Backend: Express API served through Vercel serverless functions from `api/`
- API base path: `/api`

The root `vercel.json` controls the deployment:

| Setting | Value |
| --- | --- |
| Install Command | `npm ci --prefix backend && npm ci --prefix frontend` |
| Build Command | `npm run build --prefix frontend` |
| Output Directory | `frontend/dist` |

Set these environment variables in Vercel:

| Variable | Value |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random secret |
| `CLIENT_URLS` | Optional. Your Vercel app URL, for example `https://mini-crm.vercel.app` |

You do not need `VITE_API_URL` on Vercel because the frontend uses `/api` by default. For local development, keep `frontend/.env` set to `VITE_API_URL=http://localhost:5000/api`.

Important: `mongodb://127.0.0.1:27017/mini_crm` works only on your laptop. Vercel cannot connect to your local MongoDB, so deployed builds need MongoDB Atlas or another hosted MongoDB URL. In MongoDB Atlas, allow network access for testing with `0.0.0.0/0`, then redeploy on Vercel.

## Setup

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Or install both from the project root:

```bash
npm run install:all
```

Make sure MongoDB is running locally, or replace `MONGO_URI` with your MongoDB Atlas connection string.

## Run The App

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

You can also use the root scripts:

```bash
npm run dev:backend
npm run dev:frontend
```

Open the frontend at:

```text
http://localhost:5173
```

## API Endpoints

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT |

### Leads

All lead routes require an `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/leads` | Get all leads for the logged-in user |
| GET | `/api/leads?status=New` | Filter leads by status |
| POST | `/api/leads` | Create a lead |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |

## Lead Schema

```js
{
  name: String,
  email: String,
  phone: String,
  status: "New" | "Contacted" | "Qualified" | "Closed",
  createdBy: ObjectId
}
```

## Notes

- Passwords are hashed with bcrypt before storage.
- JWT tokens are stored in `localStorage` by the frontend.
- Leads are scoped to the authenticated user through `createdBy`.
- Duplicate lead emails are prevented per user.
- API validation uses `express-validator`.
