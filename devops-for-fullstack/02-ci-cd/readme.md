### 🔧 **1. CI (Continuous Integration)**

What to know:

- **Linting:** Automatically check your code style (e.g., with ESLint or Prettier)
- **Testing:** Run unit/integration tests (e.g., Jest, Mocha, JUnit)
- **Building:** Compile/transpile code (e.g., TypeScript → JS, Webpack builds)

✅ This ensures every commit doesn’t break the codebase.

### 🚀 **2. CD (Continuous Deployment/Delivery)**

What to know:

- **Staging:** Deploy code to a preview/test environment before production
- **Production:** Final live deployment
- Know the difference:

  - **Delivery:** Auto-deploys to staging
  - **Deployment:** Auto-deploys to production

### 🛠️ **3. Pipeline Configuration**

What to know:

- **YAML files** define your workflows.
- Example: `.github/workflows/deploy.yml` in GitHub Actions
- Inside, you'll define:

  - `jobs` → a pipeline block (e.g., `build`, `deploy`)
  - `steps` → individual actions (e.g., `npm install`, `npm test`)

### ⚙️ **4. Common Actions**

What to know:

- **run tests:** `npm test` or `pytest` or `go test`
- **run linters:** `eslint .`, `flake8`, etc.
- **build artifacts:** compile assets
- **deploy to server:** use tools like Netlify CLI, Firebase CLI, SSH + Rsync, etc.

### 🔔 **5. Pipeline Triggers**

What to know:

- Trigger workflows on specific Git events:

  - `push`: Every push to a branch
  - `pull_request`: When a PR is opened or merged
  - `tag`: Used for release workflows (e.g., on `v1.2.0` tag)

- In GitHub Actions:

  ```yaml
  on:
    push:
      branches: [main]
    pull_request:
      branches: [main]
  ```

### 🧰 **6. CI/CD Tools**

What to know:

| Tool           | What it's for           | Notes                                 |
| -------------- | ----------------------- | ------------------------------------- |
| GitHub Actions | CI/CD for GitHub        | Native to GitHub, good for full-stack |
| GitLab CI      | CI/CD for GitLab        | Uses `.gitlab-ci.yml`                 |
| Jenkins        | Customizable CI/CD tool | Needs setup and servers               |
| CircleCI       | Cloud-based pipelines   | YAML config like GitHub Actions       |

### 📦 **7. Artifacts and Caching**

What to know:

- **Artifacts:** Files generated during build (e.g., compiled apps, test reports)

  - You can upload and download them across jobs/steps

- **Caching:** Reuse dependencies between runs to speed up builds

  - In GitHub Actions:

    ```yaml
    - uses: actions/cache@v3
      with:
        path: ~/.npm
        key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
    ```
