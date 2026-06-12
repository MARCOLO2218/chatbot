## Purpose
This file orients AI coding agents to the it-tickets-bot repository so they can be productive quickly. It focuses on the actual, discoverable structure and conventions in this project (not generic best-practices).

## Big picture
- Small Express-based API service (dependencies in `package.json`): `express` (v5), `pg` (Postgres client), `axios` (HTTP client), `dotenv`, and `body-parser`.
- Source files live under `src/` with obvious boundaries: server bootstrap, DB connection helpers, and route modules (e.g., `src/server.js`, `src/db.js`, `src/routes/tickets.js`).
- Data flows: HTTP request -> Express route handler -> DB helper (`pg`) -> optional external calls via `axios`.

## Key files to inspect/modify
- `package.json` — dependency list and `type: commonjs`.
- `src/server.js` — server bootstrap and route wiring.
- `src/db.js` — Postgres connection / query helper.
- `src/routes/tickets.js` — tickets-related endpoints (primary domain logic).

## Runtime / developer workflows (discoverable)
- Install deps: `npm install`.
- There is no `start` script defined; run the service directly while developing: `node src/server.js` (or `node index.js` if the project adds `index.js`).
- The repo uses CommonJS modules (`require` / `module.exports`) per `package.json`.

## Environment & integrations
- `dotenv` is listed as a dependency — expect a `.env` file for secrets (DB connection, API keys). Search for `process.env` when present to find exact variable names.
- DB: `pg` indicates Postgres. Look for DB URL/credentials in `src/db.js` or `.env` (common key: `DATABASE_URL`).
- External APIs: `axios` is used for outbound HTTP requests; wrap calls with try/catch and surface errors as HTTP responses.

## Project-specific conventions and patterns
- Keep route handlers thin: route modules under `src/routes/` should delegate DB work to `src/db.js` helpers.
- Use CommonJS `require(...)` and `module.exports` across files.
- No test runner or test scripts are present; if adding tests, add a test script to `package.json` and follow a lightweight test-only devDeps approach.

## When editing or adding features
- Add new routes in `src/routes/` and register them in `src/server.js`.
- Put Postgres connection pooling and query helpers in `src/db.js` to centralize DB concerns.
- If you add environment variables, update `README.md` with the required keys and example `.env` entries.

## Examples (where to place things)
- New HTTP route: `src/routes/newFeature.js` -> register in `src/server.js`.
- DB helper example (in `src/db.js`): export a `query(text, params)` wrapper around a `pg.Pool` instance.

## Note about existing content
- Several key files exist but are currently empty; before making structural changes, open these files to confirm current content. If you create a `start` script, confirm with the maintainer before changing `package.json`'s `main`.

If anything here is unclear or you want me to merge these instructions with an existing document differently, tell me which sections to expand or change.
