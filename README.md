# Cattleya Labs

A React + Vite storefront for Cattleya Labs (research peptides), backed by a custom Express
API in [`server/`](server/). Originally scaffolded with Base44; fully decoupled from it now.

## Frontend

```
npm install
cp .env.example .env.local   # set VITE_API_BASE_URL to your running backend
npm run dev
```

`.env.local`:

```
VITE_API_BASE_URL=http://localhost:8080
```

## Backend

See [`server/README.md`](server/README.md) for setup, local development, and Azure deployment
instructions.

## Deployment

- Frontend: Azure Static Web Apps (see [`staticwebapp.config.json`](staticwebapp.config.json)
  and [`.github/workflows/azure-static-web-apps.yml`](.github/workflows/azure-static-web-apps.yml)).
- Backend: Azure App Service (Node).
