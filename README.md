## Zyntra Node.js + MySQL Starter

Production-grade structure with Express, MySQL2, validation, logging, and tests.

### Scripts
- dev: start with nodemon
- start: run server
- test: run Jest
- lint: run ESLint
- format: run Prettier

### Env
Copy `.env.example` to `.env` and fill values.

### Structure (MVC)
```
src/
  config/        # env loader
  controllers/   # route controllers (C)
  models/        # DB access and persistence (M)
  services/      # business logic/use-cases
  views/         # serializers/DTOs (V)
  validators/    # zod schemas
  middleware/    # error, not-found, auth, validate
  lib/           # logger, mysql pool
  routes/        # api registry
  app.js         # express app
  server.js      # http server
```


