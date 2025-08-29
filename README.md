# Monorepo: React Frontend + Laravel API Backend

This repository contains a monorepo setup with a React frontend and a Laravel backend API.

## Structure

```
/apps/frontend   -> React + TypeScript + Vite + Redux + MUI Data Grid
/apps/backend    -> Laravel API (Docker Sail)
```

## Features

- **Frontend**
  - React + TypeScript
  - Vite for fast builds and development
  - Redux for state management
  - Material UI (MUI) Data Grid for article management UI

- **Backend**
  - Laravel API
  - Docker Sail for containerized development
  - REST endpoints to manage articles

## Prerequisites

- Node.js (>= 18)
- Docker & Docker Compose
- PHP (>= 8.1, if not using Docker directly)
- Composer

## Getting Started

### Backend (Laravel with Docker Sail)

1. Navigate to the backend folder:
   ```bash
   cd apps/backend
   ```

2. Start Docker Sail:
   ```bash
   pnpm up
   ```

3. Upgrade composer:
   ```bash
   ./vendor/bin/sail composer self-update
   ```

4. Run migrations and seeders:
   ```bash
   ./vendor/bin/sail artisan migrate --seed
   ```

5. Enable and set storage permissions:
   ```bash
   ./vendor/bin/sail artisan storage:link
   ```

6. Stop docker Sail:
   ```bash
   pnpm down
   ```

---

### Frontend (React + Vite + Redux + MUI)

Install dependencies:
```bash
pnpm install
```


### Start both frontend and backend

Start the development server:
```bash
pnpm dev
```

```bash
# The frontend should now be available at:
http://localhost:5173
# The backend API should now be running at:
http://localhost:8089/api
```

---

## API Endpoints (Articles)

- `GET /api/articles` – List all articles
- `POST /api/articles` – Create an article
- `GET /api/articles/{id}` – Get article details
- `PUT /api/articles/{id}` – Update an article
- `DELETE /api/articles/{id}` – Delete an article

---

## Environment Variables

### Frontend
Create a `.env` file in `/apps/frontend`:

```
VITE_API_BASE_URL=http://localhost:8089/api
```

### Backend
Copy `.env.example` to `.env` in `/backend` and configure database & Sail options.

---

## Development Notes

- The frontend communicates with the backend via REST endpoints.
- Docker Sail handles the backend environment.
- Articles are displayed in the MUI Data Grid with CRUD actions.

---

## License

This project is licensed under the MIT License.
