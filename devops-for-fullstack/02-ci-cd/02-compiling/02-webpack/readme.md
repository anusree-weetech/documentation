Great! You've already seen how the **TypeScript compiler (`tsc`)** works for **transpiling TypeScript → JavaScript**.

Now let's look at a **complete working example** of using a **compiler + bundler** — specifically **Webpack**, which compiles/transpiles TypeScript and **bundles** everything into a single JS file.

---

## ✅ Goal

Build a simple TypeScript app using **Webpack**, and **compile/transpile it** to a bundled JavaScript file.

---

## 📁 Project Structure

```
my-webpack-ts-app/
├── dist/              ← Output (auto-generated)
├── src/
│   └── index.ts       ← Your TypeScript entry point
├── package.json
├── tsconfig.json
└── webpack.config.js
```

---

## 📦 `package.json`

```json
{
  "name": "webpack-ts-demo",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "webpack": "^5.91.0",
    "webpack-cli": "^5.1.4",
    "ts-loader": "^9.5.1"
  }
}
```

### ➕ Install dependencies:

```bash
npm install
```

---

## 🧠 What is `ts-loader`?

It's a Webpack loader that lets Webpack compile `.ts` files using `tsc` internally.

---

## 🔧 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

---

## 🔧 `webpack.config.js`

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'  // or 'production'
};
```

---

## 📝 `src/index.ts`

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}

console.log(greet('Webpack + TypeScript'));
```

---

## 🛠️ Build the Project

```bash
npm run build
```

This will generate:

```
dist/bundle.js
```

And if you open it, you’ll see a single (bundled and transpiled) JS file with your logic.

---

## ✅ Recap

This example shows how to:

| Step              | Tool                | Purpose                           |
| ----------------- | ------------------- | --------------------------------- |
| Write code        | TypeScript          | Modern, typed language            |
| Compile/Transpile | ts-loader + Webpack | TS → JS, via `tsc`                |
| Bundle            | Webpack             | Combine all modules into one file |

---

If you want the same setup for **React**, **Vite**, or **ESBuild**, I can give you a parallel example.
