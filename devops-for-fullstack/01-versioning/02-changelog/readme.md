

### 🧩 2. In a `CHANGELOG.md` file (kept in the repo)

This is **version-controlled** along with your code. It lives in the root directory of the project.

#### Example:

```markdown
# Changelog

## [1.2.0] - 2025-06-15
### Added
- Dark mode for UI
- Search functionality with fuzzy matching

### Fixed
- Footer overlapping issue on mobile

### Security
- Input sanitization for search queries

## [1.1.1] - 2025-05-10
### Fixed
- Crash on clicking "Submit" when form was empty
```

> 🔹 Pro tip: You can auto-generate changelogs from commits using tools like:

* [`standard-version`](https://github.com/conventional-changelog/standard-version)
* [`conventional-changelog`](https://github.com/conventional-changelog/conventional-changelog)
* GitHub Actions or CI plugins (e.g., `release-drafter`)

---

## ✅ Summary

| Location          | How to Add Release Info                                     |
| ----------------- | ----------------------------------------------------------- |
| GitHub Releases   | Web UI or API when creating a release from a tag            |
| `CHANGELOG.md`    | Markdown file in your repo, updated manually or via scripts |
| Annotated Git Tag | `git tag -a v1.2.0 -m "Summary"` → message is short only    |
| CI/CD tools       | Auto-generate changelogs or attach messages during tagging  |

