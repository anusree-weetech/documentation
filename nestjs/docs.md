## Concepts associated with NestJs
- modules, 
- controllers, 
- providers, 
    - services, repositories, guards, pipes, middlewares, etc
    - needs to do dependency registration/providing dependencies
    - using providers array
        - custom provider
        - provider meta data keys : provide, useValue, useClass, useFactory, useExisting, etc
- services,
- dependecy injection of providers, 
    - done by dependcy injection container inside nestjs (not a visible thing in code).
    - explicit injection using @inject parametrer decorator to inject providers/token
    - implicit injection in contructor without @inject decorator
    - require dependecy registration or making classes/providers injectable using @injectable
- Routing – Managed through controllers (@Controller() and @Get(), @Post(), etc.).
- Request Lifecycle :  Middleware, guards, interceptors, and filters modify requests/responses.
    - done by implementing its respective interfaces
- Request Object – Access via @Req() and @Body(), @Param etc decorators
- configuration module: for dealing with dtabse env variables, validations, handle diff env files (eg:joi), 
- env variables
- pipes
- database
    - uses entities to define schema/model

6. Database & ORM Support
✅ TypeORM & MikroORM – For working with relational databases.
✅ Prisma – Alternative for database interactions.
✅ Mongoose – For MongoDB integration.
✅ Repository Pattern – Used in TypeORM for managing data.

7. Authentication & Authorization
✅ Passport.js – Supports strategies like JWT, OAuth, and local auth.
✅ JWT (JSON Web Token) – Common authentication method.
✅ Role-based Access Control (RBAC) – Implemented with Guards.

8. WebSockets & Real-Time Communication
✅ WebSockets – @WebSocketGateway() for real-time features.
✅ Event Emitters – Built-in support for event-driven architecture.

9. Microservices & Event-Driven Architecture
✅ Kafka, RabbitMQ, Redis – Support for various message brokers.
✅ NestJS Microservices Module – Used for distributed systems.
✅ CQRS (Command Query Responsibility Segregation) – Implements event sourcing patterns.

10. Testing
✅ Unit Testing – Jest is the default test framework.
✅ E2E Testing – End-to-end tests using Supertest.
✅ Mocking Services – jest.mock() and dependency injection for test isolation.

11. Performance & Optimization
✅ Caching – Use Redis for response caching.
✅ Compression – Optimize responses with CompressionMiddleware.
✅ Rate Limiting – Prevent abuse using RateLimiterMiddleware.

12. Deployment & Scaling
✅ Dockerization – Easily deploy NestJS apps in containers.
✅ Kubernetes – For large-scale deployments.
✅ Serverless – Deploy to AWS Lambda, Vercel, etc.

13. GraphQL Support
✅ GraphQL Module – First-class support for GraphQL APIs.
✅ Resolvers – Replace controllers in a GraphQL setup.
✅ Schema-first vs. Code-first – Two approaches to GraphQL.\

### projetc structure
```
nestjs-app/
│── src/
│   ├── modules/
│   │   ├── auth/              # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.guard.ts   # Guards for authentication
│   │   │   ├── jwt.strategy.ts # JWT strategy
│   │   ├── users/             # User module
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── users.module.ts
│   ├── common/                # Shared utilities
│   │   ├── decorators/        # Custom decorators
│   │   ├── filters/           # Exception filters
│   │   ├── interceptors/      # Request interceptors
│   │   ├── pipes/             # Validation pipes
│   ├── database/              # Database config
│   │   ├── prisma.service.ts  # Prisma service (if using Prisma)
│   │   ├── typeorm.config.ts  # TypeORM config (if using TypeORM)
│   ├── main.ts                # Entry point
│   ├── app.module.ts          # Root module
│── test/                      # Unit and E2E tests
│── .env                       # Environment variables
│── tsconfig.json              # TypeScript config
│── package.json               # Dependencies
```


### Extra
In addition to the core concepts you’ve already covered, there are a few **advanced concepts** and **features** in NestJS that are worth mentioning. Here’s a further breakdown:

---

### **14. Asynchronous Programming**
✅ **Async Providers** – Allows providers to be asynchronously initialized (useful for services like database connections).  
✅ **Async Module Initialization** – Ensures modules or services are properly initialized before usage.

---

### **15. Pipes**
✅ **Validation Pipe** – Automatically validates incoming request data (often used with DTOs).  
✅ **Transformation Pipe** – Transforms incoming data (e.g., converting string to number).  
✅ **Custom Pipes** – You can create your own pipes for specific logic (e.g., sanitizing input).  
✅ **UsePipes** – Global or route-specific validation/transformation.  

---

### **16. Custom Decorators**
✅ **Custom Class Decorators** – For enhancing the functionality of classes (e.g., logging, tracking).  
✅ **Custom Method Decorators** – Can be used to modify method behavior (e.g., caching).  
✅ **Custom Parameter Decorators** – For custom parameter extraction (e.g., session-based data).  

---

### **17. Application Lifecycle Hooks**
✅ **OnModuleInit** – Used to execute logic after the module is initialized.  
✅ **OnModuleDestroy** – Clean-up logic when a module is destroyed.  
✅ **BeforeApplicationShutdown** – Used to handle shutdown logic (e.g., graceful termination of DB connections).

---

### **18. Middleware with Dependency Injection**
✅ **Middleware & DI** – Middleware can have access to services via dependency injection.  
✅ **Custom Middleware** – You can write middleware that is specific to certain routes, modules, or globally.

---

### **19. Request Scoping**
✅ **Request-scoped Providers** – Allows providers to be instantiated per request rather than globally.  
✅ **Request-scoped Services** – Useful for services that depend on a request, like session data.  
✅ **Scope Enum** – Define provider scopes as either singleton or request-scoped.

---

### **20. Custom Exception Filters**
✅ **Global Error Handling** – Define centralized error-handling logic using custom filters.  
✅ **Exception Handling with Response Interception** – Catch exceptions and modify the response (e.g., return a custom error response format).  
✅ **HttpException** – NestJS’s built-in class for HTTP errors, extendable to custom errors.

---

### **21. Scheduling Tasks**
✅ **Task Scheduling** – Use `@nestjs/schedule` to run tasks at specified intervals (cron jobs).  
✅ **Scheduler Module** – Helps with scheduling tasks, background jobs, and retries.  
✅ **SetTimeout/SetInterval** – Use native JavaScript functions for scheduling specific jobs.

---

### **22. Custom Modules**
✅ **Feature Modules** – Split large applications into smaller, feature-based modules for better maintainability.  
✅ **Shared Modules** – Modules that are shared between different parts of the application to avoid code duplication.

---

### **23. CORS (Cross-Origin Resource Sharing)**
✅ **CORS Configuration** – Enable or configure CORS to allow resources to be requested from different domains.  
✅ **Cross-Origin Requests Handling** – Customize CORS to handle different HTTP methods, headers, and credentials.

---

### **24. Health Checks & Monitoring**
✅ **Health Module** – Monitor the health of your app (e.g., database, external APIs) using `@nestjs/terminus`.  
✅ **Prometheus** – Integrate Prometheus for monitoring app performance.  
✅ **Metrics** – Expose custom metrics for tracking app usage, performance, etc.

---

### **25. Async Configuration**
✅ **Async Configuration with `ConfigModule`** – Allows for configuration loading asynchronously, especially when dealing with database or environment-specific settings.

---

### **26. WebSockets & Gateways**
✅ **Gateway Decorators** – `@WebSocketGateway()` for creating WebSocket-based servers in NestJS.  
✅ **Socket.io** – Native support for real-time communication with `socket.io` protocol.  
✅ **WebSocket Events** – Listen to and emit events between clients and servers in real time.

---

### **27. Custom Request Handlers**
✅ **Custom HTTP Adapters** – Implement your own HTTP adapter for different web frameworks like `Express` or `Fastify`.

---

### **28. Advanced Security**
✅ **Rate Limiting** – Protect against DoS attacks and limit the number of requests from users.  
✅ **Helmet** – Use `HelmetModule` to secure HTTP headers and avoid common web vulnerabilities.  
✅ **CSRF Protection** – Built-in protections to prevent Cross-Site Request Forgery attacks.

---

### **29. Internationalization (i18n)**
✅ **i18n Module** – Support for multiple languages and regional formatting.  
✅ **Dynamic Translations** – Integrate translation files dynamically in your application for multilingual support.

---

### **30. Authorization Strategies**
✅ **OAuth2/OAuth1** – Implement complex authorization flows using OAuth strategies for third-party integrations.  
✅ **OpenID Connect** – Authenticate users with OpenID Connect in combination with OAuth2.

---

### **31. CLI Plugins & Extensions**
✅ **NestJS CLI Extensions** – Use NestJS CLI extensions to add custom commands to your project.  
✅ **GraphQL CLI** – An extension to integrate GraphQL schemas and resolvers easily.  

---

These are additional advanced and specialized features of NestJS. The flexibility of the framework allows for customization to meet specific application needs. Do you want more detailed guidance on any of these concepts or examples of how to implement them? 😊