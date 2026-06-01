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
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

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

## Frontend Deployment On Vercel

The `frontend/` folder includes a `vercel.json` for deploying only the frontend.

Vercel settings:

| Setting | Value |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `frontend` |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Set this Vercel environment variable if your backend is deployed somewhere:

```env
VITE_API_URL=https://your-backend-url.com/api
```

If `VITE_API_URL` is not set, the frontend falls back to `http://localhost:5000/api`, which is only useful for local development.

## Backend Deployment On Vercel

The `backend/` folder includes a `vercel.json` for deploying only the backend API.

Create a second Vercel project for the backend with these settings:

| Setting | Value |
| --- | --- |
| Root Directory | `backend` |
| Install Command | `npm install` |
| Build Command | `echo "No backend build step"` |
| Output Directory | `public` |

Set these Vercel environment variables on the backend project:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mini_crm
JWT_SECRET=your-long-random-secret
CLIENT_URLS=https://your-frontend-project.vercel.app,http://localhost:5173
```

Important: `mongodb://127.0.0.1:27017/mini_crm` works only on your laptop. A Vercel backend cannot connect to your local MongoDB because `localhost` on Vercel means Vercel's own serverless environment, not your computer. For a deployed backend, use MongoDB Atlas or another hosted MongoDB service.

After the backend is deployed, copy its Vercel URL and set this on the frontend Vercel project:

```env
VITE_API_URL=https://your-backend-project.vercel.app/api
```

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
