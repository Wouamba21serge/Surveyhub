# SurveyHub

Online survey system (Google Forms clone). Stack: React (Vite) · Node.js + Express (MVC) · PostgreSQL + Prisma.

## Design
Figma (wireframes, UI design, prototype): PASTE-YOUR-LINK-HERE

## This task: authentication
- Signup, login, logout, protected route (`/dashboard`)
- bcrypt password hashing, JWT in an HttpOnly cookie, Zod validation, rate limiting, helmet, CORS

## Structure
- `server/` Express API: `routes/` -> `controllers/` -> Prisma (`prisma/schema.prisma`); `middleware/` = auth, validation, errors
- `client/` React app, atomic design: `components/atoms|molecules|organisms`, `templates/`, `pages/`

## Run locally
```
cd server
copy .env.example .env     (edit DATABASE_URL and JWT_SECRET)
npm install
npx prisma db push
npm run dev
```
```
cd client
npm install
npm run dev
```
Open http://localhost:5173
