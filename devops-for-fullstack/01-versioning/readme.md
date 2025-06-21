

## ✅ 1. **Git Commands**

**Know what each command does, and when/how to use it.**

| Command               | What You Should Know                                           |
| --------------------- | -------------------------------------------------------------- |
| `git clone`           | Copy a remote repo to your local machine                       |
| `git init`            | Create a new Git repo in your current folder                   |
| `git add`             | Stage changes (files) to be committed                          |
| `git commit -m "msg"` | Save a snapshot of changes                                     |
| `git push`            | Upload local commits to remote repo                            |
| `git pull`            | Fetch + merge changes from remote                              |
| `git merge`           | Merge branches (e.g., `feature` into `main`)                   |
| `git rebase`          | Reapply commits from one branch onto another (cleaner history) |
| `git stash`           | Temporarily save uncommitted changes                           |
| `git checkout`        | Switch branches or files (also used to create new branches)    |

👉 **Practice tip**: Learn what happens in `.git` folder when using these.



## ✅ 2. **Branching**

**Understand how to isolate and organize work using branches.**

| Type of Branch     | Use Case                                             |
| ------------------ | ---------------------------------------------------- |
| **Feature branch** | For a specific feature; usually branched from `main` |
| **Hotfix branch**  | For urgent bug fixes in production                   |
| **Release branch** | For final QA/testing before pushing to production    |

 You should know:

- How to create and switch (`git checkout -b feature/login`)
- When to merge/delete branches
- Avoid pushing directly to `main`



## ✅ 3. **Branching Models**

| Model           | What to Know                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------ |
| **GitFlow**     | Uses branches like `feature/`, `release/`, `hotfix/`, `develop` → good for big teams and structured release cycles |
| **Trunk-based** | Single long-lived branch (`main`), short-lived feature branches merged daily → used in agile/CI-first teams        |

 Understand pros/cons and when your team is using which model.


###  2. **Versioning: What is the order? When does what change?**

This refers to **Semantic Versioning (SemVer)**, which is a standard used in GitFlow and software release processes.

**Format:**

```
MAJOR.MINOR.PATCH
e.g., 2.3.1
```

| Part                | Changes When You...                                                                        | Example         |
| ------------------- | ------------------------------------------------------------------------------------------ | --------------- |
| **MAJOR** (`2.x.x`) | Make a breaking change (changes APIs, removes functionality, requires devs to modify code) | `1.0.0 → 2.0.0` |
| **MINOR** (`x.3.x`) | Add new features (non-breaking)                                                            | `2.1.0 → 2.2.0` |
| **PATCH** (`x.x.1`) | Make bug fixes or small improvements (no new features)                                     | `2.3.0 → 2.3.1` |

🔸 **Start with `v1.0.0`** for your first stable production release.
Before that, use `v0.x.y` (pre-release/experimental phase).

✅ **Examples:**

* `v0.1.0` → experimental version
* `v1.0.0` → first stable version
* `v1.1.0` → added feature (e.g., dark mode)
* `v1.1.1` → fixed bug in dark mode



## ✅ 4. **Conflict Resolution**

You must know:

- What causes a **merge conflict** (same file/line edited in two branches)
- How to recognize **conflict markers** in a file:

  ```
  <<<<<<< HEAD
  your version
  =======
  their version
  >>>>>>> other-branch
  ```

- How to resolve conflicts manually or with a tool (e.g., VS Code or `git mergetool`)
- How to avoid conflicts by pulling regularly



## ✅ 5. **Pull Requests / Merge Requests**

You should know:

- How to **create a PR/MR** on GitHub/GitLab
- How to write a good title/description
- Importance of **code review**, checklists, CI checks
- How to **review others’ code**: suggest changes, approve, request changes
- **Squash merge** vs **regular merge**



## ✅ 6. **Commit Standards**

| Term                     | What You Should Know                                                        |
| ------------------------ | --------------------------------------------------------------------------- |
| **Conventional Commits** | Use a format like `feat: add login form`, `fix: correct spelling`, `chore:` |
| **Semantic Versioning**  | Know when a change is MAJOR (breaking), MINOR (features), PATCH (bugfix)    |

- Write clear, descriptive commits
- One commit = one logical change (atomic commits)



## ✅ 7. **Git Hooks and Automation**

Hooks let you run scripts before or after Git actions.

- `pre-commit`: run tests, format code (`lint-staged`, `husky`)
- `commit-msg`: check commit format
- Use tools like [Husky](https://typicode.github.io/husky) to automate in JS projects

 Know:

- Where hooks live: `.git/hooks`
- How to use them to enforce quality and automation



### ✅ Summary: What Should You _Be Able to Do_?

| Task                               | Expected Ability                      |
| ---------------------------------- | ------------------------------------- |
| Create, switch, and merge branches | ✅ Confidently                        |
| Resolve merge conflicts            | ✅ Without panic                      |
| Create clean commits & PRs         | ✅ With clear messages                |
| Understand repo workflows          | ✅ GitFlow vs Trunk                   |
| Use GitHub/GitLab like a pro       | ✅ Push, PR, Review                   |
| Use git stash/rebase safely        | ✅ For advanced workflows             |
| Setup Husky or Git hooks           | 🟡 Bonus skill for high-quality teams |


