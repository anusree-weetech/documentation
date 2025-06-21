

##  What Are Git Hooks?

**Git hooks** are scripts that Git runs **automatically** at certain points in your workflow.
They live in `.git/hooks` (a folder inside your repo’s `.git` directory — **not tracked by Git**).

They help **enforce standards**, **run tests**, or **automate tasks** like formatting, linting, etc.



###  Commonly Used Git Hooks

| Hook Name    | When it Runs                      | Example Use Case                                     |
| ------------ | --------------------------------- | ---------------------------------------------------- |
| `pre-commit` | Before a commit is finalized      | Run tests, lint code, format with Prettier           |
| `commit-msg` | After the commit message is typed | Validate message format (e.g., Conventional Commits) |
| `pre-push`   | Before pushing to a remote        | Run tests or verify build                            |
| `post-merge` | After merging a branch            | Reinstall deps or run migrations                     |



###  Default Location

Hooks are located in:

```
.git/hooks/
```

You’ll find default samples like `pre-commit.sample`, `commit-msg.sample`, etc.
They’re not active until renamed and made executable.



###  Example: Basic Custom Hook

Here’s a basic `pre-commit` hook:

```bash
#!/bin/sh
echo "Running pre-commit checks..."
npm test || exit 1
```

Save it as `.git/hooks/pre-commit` and give it execute permission:

```bash
chmod +x .git/hooks/pre-commit
```

⚠️ Problem: `.git/hooks/` is **not shared across teammates**, and manual setup is annoying.



##  Modern Solution: Husky + lint-staged

Use **Husky** (for hook management) and **lint-staged** (to run commands only on changed files).



### 🧩 Step-by-step: Husky in a JS Project

#### 1. Install

```bash
npm install --save-dev husky
```

#### 2. Enable Git hooks

```bash
npx husky install
```

Then add this to your `package.json`:

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```



#### 3. Add a hook

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

It creates:

```
.husky/pre-commit
```

With this content:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```



### 🧹 Example with lint-staged

Install it:

```bash
npm install --save-dev lint-staged
```

Then in `package.json`:

```json
"lint-staged": {
  "*.js": ["eslint --fix", "prettier --write"]
}
```

 This will run ESLint and Prettier **only on changed `.js` files** when you commit.



##  `commit-msg` Hook for Conventional Commits

Create this file:

```
.husky/commit-msg
```

With content:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit "$1"
```

And install:

```bash
npm install --save-dev @commitlint/{config-conventional,cli}
```

Then create a config file:

```bash
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

Now it will **block invalid commit messages** like "fixed login" and allow only "fix: login bug".



##  Summary: What to Know

| Concept            | What You Need to Know                           |
| ------------------ | ----------------------------------------------- |
| Git hooks location | `.git/hooks` (manual) or `.husky/` (with Husky) |
| `pre-commit` usage | Run tests, lint, Prettier                       |
| `commit-msg` usage | Enforce commit standards                        |
| `Husky`            | Best tool to manage Git hooks in teams          |
| `lint-staged`      | Optimizes commands for only changed files       |
| `commitlint`       | Validates commit messages                       |


