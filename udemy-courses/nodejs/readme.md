## Nodejs

### 1. Introduction
- video: https://archive.org/details/nodejs-the-complete-guide-mvc-rest-apis-graphql-deno-01-introduction
- uses v8 engine to compile javascript to machine code to be run on te browser

#### Flow of website
![image](https://github.com/user-attachments/assets/a8bce53e-83aa-4f68-a139-f48138d75d05)

### 2. Improved development flow
- introduced npm. defined in package.json
- 3rd party packages that can be saved as production or dedvelopment dependencies
- types of errors: syntax, runtime, logical. syntax and runtime debugged using line numbers. logical errors using debugger.
- debugging explained
### 3. Understanding Basics 
-video: https://archive.org/details/nodejs-the-complete-guide-mvc-rest-apis-graphql-deno-03-understanding-the-basics/007+Sending+Responses.mp4
- how web works
![image](https://github.com/user-attachments/assets/0a29521c-2075-4ea2-bfcf-577519f78ceb)
- we can use process.exit() to exit event loop (nodejs)
- requests have headers, cookies, meta data, etc
- Node.js is event-driven and non-blocking. It executes code synchronously but handles asynchronous operations based on events.
- modules, imports and exports discussed
- module sumamry: ![image](https://github.com/user-attachments/assets/cd94b8bf-7b0f-4600-b35c-9161b5bb4aae)

### 5. Working with expressjs
- installing expressjs
- using middlewares, middlerwares in hood sets headers for us simpifying responses.

### 6. Working with dynamic content
- creating pug files, handlebar files
- adding dynamic cntent to these files

### 7. MVC
- mvc: model, view, controller. model: represents data, manages saving fetching, contains data related logic. view: what user sees, shouldnt contain too muc logic. controller: connects model and view.
- exmaple: product.js: maniuating product data, ejs files: views, product.controller.js: controllers having logic first to maniplate data then return/respond with the view.

### 12. Working with no sql 
- sql includes strong data schema, have data relations. nosql has no data schema, no structure fo data, no /fewer relations
- diff between sql and nosql: ![image](https://github.com/user-attachments/assets/1b28582a-1f2c-4354-b5b2-85ecc6186392)
- mysql installation, sql setup
- basic sql, creating tables, fetching and adding data 

### 13. Sequelize
- orm for sql. 
- models, data manipulation