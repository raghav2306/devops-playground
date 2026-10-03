# Node.js JWT auth API

Express + TypeScript + MongoDB (Mongoose) API with access/refresh tokens and role-based access control.

## Routes

| Area | Routes |
|---|---|
| Auth | `register-user`, `login`, `refresh`, `logout`, `forgot-password`, `reset-password` |
| Users | `profile/:userId` |
| Manager | `manager/dashboard` |
| Admin | `admin/users`, `admin/assign-role` |

Protected routes use the `verifyJWT` middleware; role routes use the `check-Role` middleware.

## Configuration

Copy `.env.example` to `.env` and fill in your own values. Never commit `.env`.

## Run

```bash
npm ci
npm run dev
npm run build && npm start
```
