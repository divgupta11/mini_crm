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

## Render Deployment

This repo includes a root `render.yaml` Blueprint that provisions both services:

- `mini-crm-backend`: Node web service from `backend/`
- `mini-crm-frontend`: static Vite site from `frontend/`

Use Render's Blueprint flow and point it at this repository. Render will run these commands:

| Service | Build Command | Start/Publish |
| --- | --- | --- |
| Backend | `npm ci` | `npm start` |
| Frontend | `npm ci && npm run build` | publish `dist` |

Set the prompted Render environment variables:

| Service | Variable | Value |
| --- | --- | --- |
| Backend | `MONGO_URI` | MongoDB Atlas connection string |
| Backend | `JWT_SECRET` | Long random secret, or use Render's generated value in the Blueprint |
| Backend | `CLIENT_URLS` | Render frontend URL, for example `https://mini-crm-frontend.onrender.com` |
| Frontend | `VITE_API_URL` | Render backend API URL with `/api`, for example `https://mini-crm-backend.onrender.com/api` |

`JWT_SECRET` is generated automatically when deploying with the included Blueprint. The backend health check is available at `/api/health`, and the frontend has a SPA rewrite so React Router routes load directly.

If the backend deploy builds successfully and then exits while running `npm start`, check these first:

- `MONGO_URI` must be set on the backend service, not the frontend service.
- MongoDB Atlas must allow Render to connect. In Atlas, add `0.0.0.0/0` under Network Access while testing, or use a stricter allowlist once you know your deployment path.
- `JWT_SECRET` must be set on the backend service.
- `CLIENT_URLS` should contain the deployed frontend origin without `/api`, for example `https://mini-crm-frontend.onrender.com`.

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
