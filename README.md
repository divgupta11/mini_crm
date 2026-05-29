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

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mini_crm
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Examples are included in `backend/.env.example` and `frontend/.env.example`.

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
