## SYZYGY Journal (FXTech Trading Journal)

SYZYGY is a trading journal I built to log trades, keep notes, and review performance over time. It was my first bigger full-stack project, so I tried to build it “for real”: authenticated users, a real database, and a frontend that feels like an actual product instead of a demo.

You can:

- Create trades (including scale-out exits) and edit/delete them
- Add trade notes with a rich text editor (and upload images inside notes)
- View dashboard analytics (net P&L, win rate, avg win/avg loss, cumulative P&L chart)
- Browse a trading calendar that shows P&L + trade counts by day for the month
- Read a “Market Pulse” news feed (live via Finnhub when configured)
- Update your profile + toggle dark mode

## Demo / portfolio notes

There’s a demo user available from the login screen (“Explore the app”). The demo user can read data, but write actions are blocked (so you can click around safely).

## Tech Stack

Backend:

- Node.js + Express
- Prisma + PostgreSQL
- JWT auth stored in an httpOnly cookie
- Finnhub news feed (optional)
- Cloudinary image uploads for trade notes

Frontend:

- React + Vite
- React Router data routers (loaders/actions)
- TanStack Query for server state
- Recharts for the dashboard chart
- Quill editor for trade notes

## Getting Started

### Prerequisites

- Node.js
- A Postgres database

### 1) Install dependencies

From the repo root:

```bash
npm run setup-project
```

### 2) Configure environment variables

Create a `.env` file in the repo root with:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME"

JWT_SECRET="some-long-random-string"
JWT_EXPIRES_IN="1d"

# Cloudinary (required for image uploads in the notes editor)
CLOUD_NAME="your_cloudinary_cloud_name"
# Either set CLOUD_API_KEY/CLOUD_API_SECRET or CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET
CLOUD_API_KEY="your_api_key"
CLOUD_API_SECRET="your_api_secret"

# Optional: live news
FINNHUB_API_KEY="your_finnhub_key"
NEWS_TECH_SYMBOLS="AAPL,MSFT,NVDA,GOOGL,META,TSLA"
```

Notes:

- If `FINNHUB_API_KEY` is not set, the news page falls back to demo content.
- The image uploader is wired through Cloudinary. If Cloudinary env vars are missing, notes image upload will fail (the rest of the app still works).

### 3) Run the database migrations

```bash
npx prisma migrate dev
```

### 4) Start the app

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5100`

## Project Endpoints (high level)

The frontend talks to the backend under `/api/v1`:

- `POST /api/v1/auth/register` - create an account
- `POST /api/v1/auth/login` - login (sets the JWT cookie)
- `GET /api/v1/auth/logout` - logout
- `GET /api/v1/users/current-user` - fetch current user profile
- `PATCH /api/v1/users/update-user` - update profile
- `GET /api/v1/trades` - list trades with filters/pagination
- `POST /api/v1/trades` - create trade (scale-out exits supported)
- `GET /api/v1/trades/:id` - fetch a single trade
- `PATCH /api/v1/trades/:id` - update trade + notes
- `DELETE /api/v1/trades/:id` - delete trade
- `POST /api/v1/trades/upload-image` - upload an image for Quill notes (Cloudinary)
- `GET /api/v1/trades/dashboard-stats` - dashboard summary + cumulative series
- `GET /api/v1/trades/dashboard-calendar` - calendar P&L + trade counts
- `GET /api/v1/news/feed` - Market Pulse feed

## What I’m proud of

- The data flow: React Router loaders/actions + TanStack Query (so pages feel snappy and still stay in sync)
- The “real” journaling logic: scale-out exits and realized P&L calculations backed by Prisma
- Notes that support images inside the editor (Quill + Cloudinary)
- A dashboard that turns trade history into chart + calendar views

## Future improvements

This is still a growing project. Some obvious next steps are adding more analytics pages (the `Stats` route is currently a stub), improving UX around trade editing edge cases, and continuing to harden validation/error handling.

