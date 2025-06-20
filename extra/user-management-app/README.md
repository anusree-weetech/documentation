## User Management App


A fullstack microservices-based application built with NestJS, React, and Nx Monorepo architecture.

### Tech Stack

-  Nx Monorepo
-  NestJS (Microservices)
-  React (Frontend)
-  PostgreSQL 

### Running Locally
- `npm install`
- `nx serve apps/auth-service`
- `nx serve apps/user-service`
- `nx serve apps/api-gateway`
- App will be available at http://localhost:3000


### Common Nx Commands

- Run a specific app: `npx nx serve <app-name>`
- Generate new app/lib: `npx nx generate app`
- Build: `npx nx build <app-name>`
- Format: `npx nx format:write`
- Create nestjs modules: run within respective module folder `npx nx g module <module-name>`