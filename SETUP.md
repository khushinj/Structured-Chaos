# Structured Chaos Setup

## Backend env

1. Go to `backend/`
2. Copy env template:

```bash
cp .env.example .env
```

Set these values in `backend/.env`:

- `MONGODB_URI` (required)
- `PORT` (optional, defaults to `5000`)
- `CORS_ORIGIN` (optional, defaults to `http://localhost:3000`)
- `CLOUDINARY_CLOUD_NAME` (required)
- `CLOUDINARY_API_KEY` (required)
- `CLOUDINARY_API_SECRET` (required)

## Frontend env

1. Go to `frontend/`
2. Copy env template:

```bash
cp .env.local.example .env.local
```

Set this value in `frontend/.env.local`:

- `NEXT_PUBLIC_API_URL` (example: `http://localhost:5000`)

## Run locally

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## API expectations

- `POST /api/entries/:section` uses `multipart/form-data`
- file field name: `image`
- `pages` requires `image`, `handle`, `description`
- `fonts` requires `name`
- `books/hobbies/grooming/fitness/explore` require `image`, `title`

## Cloudinary migration (existing images)

After setting Cloudinary env vars, run:

```bash
cd backend
npm run migrate:cloudinary
```

This uploads existing image paths from DB to Cloudinary and replaces each `image` field with its Cloudinary secure URL.
