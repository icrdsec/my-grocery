# My Grocery

A modern grocery ecommerce platform built with a Next.js storefront and a Medusa commerce backend.

## Overview

My Grocery is a full-stack ecommerce application designed as a monorepo.

The project includes:

* **Frontend:** Next.js storefront
* **Backend:** Medusa commerce engine
* **Database:** PostgreSQL
* **Cache / Queue:** Redis
* **Package management:** pnpm workspace
* **Build system:** Turborepo

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui components

### Backend

* Medusa
* Node.js
* TypeScript
* PostgreSQL
* Redis

### Development Tools

* pnpm
* Docker
* Turborepo

---

# Project Structure

```
my-grocery/
│
├── apps/
│   ├── backend/        # Medusa backend API
│   └── web/            # Next.js storefront
│
├── packages/           # Shared packages
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── pnpm-lock.yaml
```

---

# Requirements

Before running the project locally, install:

## Required

* Node.js 20+
* pnpm 9+
* Docker Desktop

Check versions:

```bash
node -v
pnpm -v
docker -v
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/icrdsec/my-grocery.git

cd my-grocery
```

Install dependencies:

```bash
pnpm install --frozen-lockfile
```

---

# Backend Setup

The backend requires environment variables.

Go to:

```bash
cd apps/backend
```

Create your local environment file:

```bash
cp .env.template .env
```

Edit `.env`:

```env
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:3000,http://localhost:9000

REDIS_URL=redis://localhost:6379

JWT_SECRET=supersecret
COOKIE_SECRET=supersecret

DATABASE_URL=postgres://grocery:mypassword@localhost:5435/my_grocery
DB_NAME=my_grocery
```

> `.env` files are intentionally ignored by Git because they contain local secrets and credentials.

---

# Database Setup

The application uses PostgreSQL.

Start PostgreSQL with Docker:

```bash
docker run \
--name my_grocery \
-e POSTGRES_USER=grocery \
-e POSTGRES_PASSWORD=mypassword \
-e POSTGRES_DB=my_grocery \
-p 5435:5432 \
-d postgres:17-alpine
```

Verify the container:

```bash
docker ps
```

You should see:

```
postgres:17-alpine
0.0.0.0:5435->5432/tcp
```

---

# Redis Setup

Start Redis:

```bash
docker run \
--name my-grocery-redis \
-p 6379:6379 \
-d redis:7-alpine
```

Verify:

```bash
docker ps
```

---

# Running the Application

From the project root:

```bash
pnpm dev
```

This starts:

## Storefront

```
http://localhost:3000
```

## Medusa Admin

```
http://localhost:9000/app
```

---

# Backend Commands

From:

```bash
cd apps/backend
```

Run development server:

```bash
pnpm dev
```

Build:

```bash
pnpm build
```

Database migrations:

```bash
pnpm medusa migrations run
```

---

# Frontend Commands

From:

```bash
cd apps/web
```

Run development server:

```bash
pnpm dev
```

Build production:

```bash
pnpm build
```

Start production:

```bash
pnpm start
```

---

# Environment Variables

The repository contains templates:

```
.env.template
```

Developers should create:

```
.env
```

locally.

Never commit:

```
.env
.env.local
.env.production
```

These files may contain:

* database passwords
* API keys
* authentication secrets
* private configuration

---

# Troubleshooting

## PostgreSQL user does not exist

Error:

```
role "username" does not exist
```

Check your `DATABASE_URL`.

Example:

Correct:

```env
DATABASE_URL=postgres://grocery:mypassword@localhost:5435/my_grocery
```

Incorrect:

```env
DATABASE_URL=postgres://my_grocery:mypassword@localhost:5435/my_grocery
```

The first value is the PostgreSQL user, not the database name.

---

## Database connection refused

Check Docker:

```bash
docker ps
```

Restart container:

```bash
docker restart my_grocery
```

---

## Port conflicts

Default ports:

| Service    | Port |
| ---------- | ---: |
| Next.js    | 3000 |
| Medusa     | 9000 |
| PostgreSQL | 5435 |
| Redis      | 6379 |

Change ports if another application is using them.

---

# Git Workflow

Before committing:

```bash
git status
```

Commit source changes:

```bash
git add .
git commit -m "describe change"
git push
```

Do not commit:

```
node_modules/
.env
.next/
dist/
```

---

# Production Notes

For production deployment:

* Use managed PostgreSQL
* Use managed Redis
* Store secrets in environment variables
* Configure HTTPS
* Use production CORS values
* Run database migrations during deployment
* Build optimized frontend assets

---

# License

Private project.
