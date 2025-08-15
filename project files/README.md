# Emergency Auto Service - Backend

## Setup
1. Copy `.env.example` to `.env` and set `MONGO_URI`.
2. Install deps: `npm install`
3. Seed sample data: `npm run seed`
4. Run dev server: `npm run dev` (or `npm start`)

## Routes
- `GET /api/services?lat=...&lng=...&radius=40&type=repair`
- `GET /api/services/search?q=brake`
- `GET /api/services/:id`
