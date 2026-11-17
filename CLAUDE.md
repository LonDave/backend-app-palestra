# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Express 5 REST API for a gym ("Palestra Atlante") managing courses (`corsi`), members (`soci`) and bookings (`prenotazioni`). It is a course exercise (ITS), written in CommonJS. Code, identifiers and comments are in Italian; follow that convention.

## Commands

- `npm install` — install dependencies (`better-sqlite3` is a native module)
- `npm start` — run `node server.js` (default port 3000, overridable with `PORT` in `.env`)
- There are no tests, linter, or build step configured.

To reset the data, delete `db/db.sqlite`: on the next start TypeORM recreates the schema and the seed runs again.

## Architecture

- **Startup flow** (`server.js`): `AppDataSource.initialize()` → if the `corsi` table is empty, read `seeds/seme.sql` and execute it in one go via the raw better-sqlite3 connection (`ds.driver.databaseConnection.exec`) → mount routers → `app.listen`. Routes are mounted only after the DB is ready, inside the `.then`.
- **Persistence** (`config/typeorm.conf.js`): TypeORM `DataSource` on better-sqlite3, file at `db/db.sqlite`, `synchronize: true` (schema is derived from the entities; there are no migrations).
- **Entities** (`models/*.model.js`) use `EntitySchema` (no decorators/classes). Entity property names may differ from column names (e.g. property `name` ↔ column `nome`); the seed SQL uses the **column** names. `Prenotazione` is the join entity with many-to-one relations to `Socio` (`socio_id`) and `Corso` (`corso_id`); `Socio` and `Corso` have the inverse one-to-many `prenotazioni`.
- **Routes** (`routes/*.route.js`) each export a named router (e.g. `{ routerCorsi }`) mounted under `/api/<resource>` in `server.js`. Only `corsi` is mounted so far; `soci.route.js` and `prenotazioni.route.js` are empty, as are `lib/`, `services/` and `public/`. The error handler in `server.js` is still a placeholder.
- **Config**: `.env` (see `.env.example`) defines `PORT` and `API_KEY` (intended for API-key protection, not yet implemented). `zod` and `ejs` are installed but not yet used.

## Known gotchas in the current code

- `dotEnv.config(join(__dirname, ".env"))` passes a string; dotenv expects `{ path: ... }`. It works only because `.env` is in the cwd when started from the project root.
- In the one-to-many relations, `inverseSide` is given as `{ name: "corso_id" }` / `{ name: "socio_id" }`; TypeORM expects the inverse **property name** as a string (`"corso"` / `"socio"`).
