| **Category** | **Module Title** | **Git Command(s)** | **Main Command Result** | **Subcommands** | **Subcommand Explanations** | **Example Output** |
|-------------|-----------------|--------------------|------------------|----------------|------------------|--------------------|
| **Initializing & Committing** | Initializing the Repository & Creating the First Commit | `git init` | Initializes a Git repository. | N/A | N/A | `Initialized empty Git repository in /path/.git/` |
| | | `git add <filename>` <br> `git commit -m "Initial commit"` <br> OR <br> `git add .` <br> `git commit -m "Initial commit"` | Adds files to staging and commits them. | `git commit --amend` | Modify the last commit without creating a new one. | `[main (root-commit) a1b2c3d] Initial commit` |
| **Viewing History & Status** | Viewing Commit History | `git log` | Shows commit history. | `git log --oneline` | Shows commits in a condensed format. | `commit a1b2c3d (HEAD -> main) Author: John Doe Date: Wed Mar 12 2025` |
| | | | | `git log --graph` | Displays a graphical representation of the branches. | |
| | | | | `git log -p` | Shows changes introduced in each commit. | |
| | Viewing Current Status | `git status` | Shows modified and untracked files. | `git status -s` | Shows a short summary of the status. | `On branch main Changes not staged for commit: modified: index.html` |
| | | `git show HEAD` | Displays details of the latest commit. | | | `commit a1b2c3d (HEAD -> main) Author: John Doe Date: Wed Mar 12 2025` |
| **Branching & Switching** | Creating and Switching Branches | `git branch <branch-name>` <br> `git switch <branch-name>` | Creates and switches to a new branch. | `git branch -a` | Lists all local and remote branches. | `Switched to branch '<branch-name>'` |
| | | `git checkout <branch-name>` | Switches to an existing branch. | | | `Switched to branch '<branch-name>'` |
| | | `git checkout <commit-hash>` | Switches to a specific commit in detached mode. | | | `Note: switching to '<commit-hash>'.` |
| | | `git switch --detach <commit-hash>` | Switches to detached HEAD mode. | | | `HEAD is now at <commit-hash>.` |
| | | | | `git branch -m <old-name> <new-name>` | Renames a branch. | |
| **Merging & Rebasing** | Merging Branches | `git merge <branch-name>` | Merges `<branch-name>` into the current branch. | `git merge --abort` | Cancels the merge. | `Merge made by the 'recursive' strategy.` |
| | | | | `git merge --squash <branch-name>` | Combines all commits from the merged branch into one. | |
| | | | | `git merge --ff <branch-name>` | Applies a fast-forward merge. | |
| | | | | `git merge --no-ff <branch-name>` | Forces a recursive merge. | |
| | Rebasing a Branch | `git rebase <branch-name>` | Moves the current branch on top of another. | | | `Successfully rebased and updated refs/heads/<branch-name>.` |
| | Handling Merge Conflicts | `git merge <branch-name>` <br> `git status` <br> `git add <conflict-file>` <br> `git commit -m "Resolved merge conflict"` | Resolves merge conflicts. | | | `Merge conflict in <conflict-file>` |
| **Deleting & Resetting** | Deleting Files from Git | `git rm <filename>` <br> `git commit -m "Deleted <filename>"` | Removes a file from Git. | | | `rm '<filename>'` |
| | Undoing Unstaged Changes | `git restore <filename>` | Reverts unstaged changes. | | | `Restored '<filename>'` |
| | Undoing Staged Changes | `git reset <filename>` | Moves file from staged to unstaged. | | | `Unstaged changes after reset:` |
| | Resetting Commits | `git reset --soft HEAD~1` | Moves HEAD back one commit, keeping changes staged. | | | `HEAD is now at a1b2c3d Last commit message` |
| | | `git reset --mixed HEAD~1` | Moves HEAD back one commit, keeping changes but unstaging them. | | | `HEAD is now at a1b2c3d Last commit message` |
| | | `git reset --hard HEAD~1` | Deletes the last commit permanently. | | | `HEAD is now at previous_commit_hash` |
| | Deleting a Branch | `git branch -d <branch-name>` | Deletes a branch if merged. | | | `Deleted branch <branch-name>` |
| **Stashing & Recovering Data** | Stashing Changes | `git stash` | Saves changes temporarily. | `git stash list` | Shows saved stashes. | `Saved working directory and index state WIP on main: a1b2c3d Initial commit` |
| | | | | `git stash pop` | Applies and removes the last stash. | |
| | | | | `git stash apply` | Applies the last stash but keeps it saved. | |
| | | | | `git stash drop <stash-index>` | Deletes a specific stash by index. | |
| | Recovering Lost Data | `git reflog` | Shows all HEAD movements. | `git reflog expire --expire=now --all` | Clears the reflog history. | `a1b2c3d HEAD@{0}: commit: Added new feature` |
| **Cherry-Picking & Tags** | Cherry-Picking a Commit | `git cherry-pick <commit-hash>` | Applies a specific commit to the current branch. | `git cherry-pick --continue` | Continues cherry-picking after resolving conflicts. | `[main <commit-hash>] Applied cherry-picked commit` |
| | | | | `git cherry-pick --abort` | Cancels cherry-picking. | |
| | Creating Tags | `git tag <tag-name>` <br> `git tag -a <tag-name> -m "<message>"` <br> `git push origin <tag-name>` | Tags a commit and pushes it to remote. | `git tag -d <tag-name>` | Deletes a local tag. | `<tag-name> pushed to remote` |
