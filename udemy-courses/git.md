

| **Category** | **Module Title** | **Git Command(s)** | **Result** | **Example Output** |
|-------------|-----------------|--------------------|------------|--------------------|
| **Initializing & Committing** | Initializing the Repository & Creating the First Commit | `git init` | Initializes a Git repository. | `Initialized empty Git repository in /path/.git/` |
| | | `git add filename` <br> `git commit -m "Initial commit"` <br> OR <br> `git add .` <br> `git commit -m "Initial commit"` | Adds files and commits them. | `[main (root-commit) a1b2c3d] Initial commit` |
| **Viewing History & Status** | Viewing Commit History | `git log` | Shows commit history. | `commit a1b2c3d (HEAD -> main) Author: John Doe Date: Wed Mar 12 2025` |
| | Viewing Current Status | `git status` | Shows modified and untracked files. | `On branch main Changes not staged for commit: modified: index.html` |
| | Viewing HEAD Commit | `git show HEAD` | Displays the latest commit details. | `commit a1b2c3d Author: John Doe Date: Wed Mar 12 2025` |
| **Branching & Switching** | Creating and Switching Branches | `git branch feature-branch` <br> `git switch feature-branch` | Creates and switches to a new branch. | `Switched to branch 'feature-branch'` |
| | Checking Out a branch | `git checkout brachname` |Switches to an existing branch. | `Switched to branch 'branchname'` |
| | Checking Out a Specific Commit (Detached HEAD) | `git checkout a1b2c3d` | Switches to a specific commit in detached mode. | `Note: switching to 'a1b2c3d'.` |
| **Merging & Rebasing** | Merging Branches | `git merge feature-branch` | Merges `feature-branch` into the current branch. | `Merge made by the 'recursive' strategy.` |
| | Applying Fast-Forward Merge | `git merge --ff feature-branch` | Merges branch without creating a merge commit. | *No merge commit is created* |
| | Applying Non-Fast-Forward Merge | `git merge --no-ff feature-branch` | Creates a merge commit even when fast-forward is possible. | *Merge commit is created* |
| | Rebasing a Branch | `git rebase main` | Moves the current branch on top of `main`. | `Successfully rebased and updated refs/heads/feature-branch.` |
| | Handling Merge Conflicts | `git merge feature-branch` <br> `git status` <br> `git add conflict_file.txt` <br> `git commit -m "Resolved merge conflict"` | Resolves merge conflicts. | `Merge conflict in conflict_file.txt` |
| **Deleting & Resetting** | Deleting Files from Git | `git rm oldfile.txt` <br> `git commit -m "Deleted oldfile.txt"` | Removes a file from Git. | `rm 'oldfile.txt'` |
| | Undoing Unstaged Changes | `git restore modified_file.txt` | Reverts unstaged changes. | `Restored 'modified_file.txt'` |
| | Undoing Staged Changes | `git reset modified_file.txt` | Moves file from staged to unstaged. | `Unstaged changes after reset:` |
| | Resetting Commits | `git reset --soft HEAD~1` | Moves HEAD back one commit, keeping changes staged. | `HEAD is now at a1b2c3d Last commit message` |
| | | `git reset --hard HEAD~1` | Deletes the last commit permanently. | `HEAD is now at previous_commit_hash` |
| | Deleting a Branch | `git branch -d feature-branch` | Deletes a branch if merged. | `Deleted branch feature-branch` |
| **Stashing & Recovering Data** | Stashing Changes | `git stash` | Saves changes temporarily. | `Saved working directory and index state WIP on main: a1b2c3d Initial commit` |
| | Recovering Lost Data | `git reflog` | Shows all HEAD movements. | `a1b2c3d HEAD@{0}: commit: Added new feature` |
| **Cherry-Picking & Tags** | Cherry-Picking a Commit | `git cherry-pick a1b2c3d` | Applies a specific commit to the current branch. | `[main a1b2c3d] Applied cherry-picked commit` |
| | Creating Tags | `git tag v1.0` <br> `git tag -a v1.0 -m "Version 1.0 release"` <br> `git push origin v1.0` | Tags a commit and pushes it to remote. | `v1.0 pushed to remote` |
