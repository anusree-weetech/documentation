## Workflow Example:

- Create feature/login-page from develop
- Merge it back to develop when done
- When ready to deploy → create release/1.2.0 from develop
- After testing → merge release/1.2.0 to both main and develop
- Create a tag on main like v1.2.0
- If a bug appears in production, make hotfix/urgent-bug, then merge it to both main and develop

## Example for versioning in diff scenarios:

Below is a **realistic versioning guide** based on different branch types and merge scenarios.

We’ll assume your project starts with:

```
main → v1.0.0
develop → v1.0.0-dev
```

### 1. When a **Feature Branch** is added and merged to `develop`, then later to `main`

- **Example branch**: `feature/login`
- **Change type**: Adds new login form (non-breaking)
- **When merged to `develop`**: No version change yet.
- **When merged to `main` via release**:
  🔹 Version becomes → **v1.1.0**

> ℹ️ New features without breaking old ones = **MINOR bump**

### 2. When a **Bug Fix Branch** is merged to `develop` and then `main`

- **Example branch**: `fix/navbar-overlap`
- **Change type**: Fixes layout bug (non-breaking)
- **When merged to `develop`**: No version change yet.
- **When merged to `main` via release**:
  🔹 Version becomes → **v1.1.1** (from v1.1.0)

> ℹ️ Bug fixes that don’t add features = **PATCH bump**

### 3. When a **Hotfix Branch** is created from `main` and merged back into both `main` and `develop`

- **Example branch**: `hotfix/crash-on-submit`

- **Change type**: Urgent crash fix on live site

- **When merged to `main` directly**:
  🔹 Version becomes → **v1.1.2** (hotfixes are PATCH)

- Also merge back to `develop` to sync

> ⚠️ You don’t wait for `develop` — hotfix goes directly to production (main), and must be merged back to dev later.

### 4. When a **Breaking Change** is introduced via feature branch

- **Example branch**: `feature/change-api-structure`
- **Change type**: Modifies how front-end consumes data (breaking)
- **When merged to `main`** via release:
  🔹 Version becomes → **v2.0.0**

> ❗ MAJOR version bump = any breaking change (API contract change, deleting a method, DB schema overhaul, etc.)

### 5. Combination: 1 Feature + 1 Bugfix → Merged via a Release Branch

Let’s say:

- `feature/add-dark-mode`
- `fix/missing-footer`

→ Both merged into `develop`
→ Then merged to `main` through a release (`release/1.2.0`)

🔹 Version becomes → **v1.2.0**

> Because **feature > bugfix** in version hierarchy:
> Even if both are included, **MINOR bump** is used.

### 6. Combination: 1 Hotfix + 1 Feature (in different paths)

- `hotfix/security-patch` → goes **immediately to `main`**

  - v1.2.1

- `feature/new-search` → still being tested on `develop`

Later:

- `develop` is merged to `main` with new feature
  🔹 Version becomes → **v1.3.0**

> 🔁 Keep counting:
> Hotfix increments `PATCH`
> Feature increments `MINOR`
> If both eventually go to `main`, the higher bump applies.

### Summary Table

| Merge Type                       | Source → Target             | Version Change |
| -------------------------------- | --------------------------- | -------------- |
| `feature/*` → `develop` → `main` | MINOR bump → `v1.x.0`       |                |
| `fix/*` → `develop` → `main`     | PATCH bump → `v1.0.x`       |                |
| `hotfix/*` → `main` → `develop`  | PATCH bump → `v1.0.x`       |                |
| `feature/` with breaking change  | MAJOR bump → `v2.0.0`       |                |
| `release/x.y.z` merged to `main` | Sets exact version: `x.y.z` |                |

### 🔧 Practice Tip:

You can simulate this locally like:

```bash
# Start point
git checkout -b maindummy
git tag v1.0.0
git checkout -b developdummy

# Feature branch
git checkout -b featuredummy/add-login
# make a commit
git checkout developdummy
git merge featuredummy/add-login
# Later: merge to maindummy via release → tag v1.1.0

# Fix branch
git checkout -b fixdummy/navbar-bug
# make a commit
git merge fixdummy/navbar-bug
# → tag v1.1.1

# Hotfix
git checkout maindummy
git checkout -b hotfixdummy/crash
# make a commit
git merge hotfixdummy/crash
git tag v1.1.2
git checkout developdummy
git merge hotfixdummy/crash
```

---

Would you like a **versioning cheat sheet**, or a **scripted Git practice flow** to try this end-to-end?
