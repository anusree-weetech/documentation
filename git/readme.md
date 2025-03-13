### my own additon to git commands table

| **Category** | **Module Title** | **Git Command(s)** | **Main Command Result** | **Example of Main Command** | **Subcommands** | **Subcommand Explanations** | **Example of Subcommand** |
|-------------|-----------------|--------------------|------------------|--------------------|----------------|------------------|--------------------|
| **Initializing & Committing** | Initializing the Repository & Creating the First Commit | `git init` | Initializes a Git repository. | `Initialized empty Git repository in /path/.git/` | N/A | N/A | N/A |
| | | `git add <filename>` <br> `git commit -m "Initial commit"` <br> OR <br> `git add .` <br> `git commit -m "Initial commit"` | Adds files to staging and commits them. | `[main (root-commit) a1b2c3d] Initial commit` | `git commit --amend` | Modify the last commit without creating a new one. | `Commit message modified.` |
| **Viewing History & Status** | Viewing Commit History | `git log` | Shows commit history. | `commit a1b2c3d (HEAD -> main) Author: John Doe Date: Wed Mar 12 2025` | `git log --oneline` | Shows commits in a condensed format. | `a1b2c3d Initial commit` |
| | | | | | `git log --graph` | Displays a graphical representation of the branches. Press q to exit. | <img src='https://github.com/user-attachments/assets/558cb3b3-38c0-4637-9fe5-b92898156868' width=400 />|
| | | | | | `git log -p` | Shows changes introduced in each commit. | 
| |<img src='https://github.com/user-attachments/assets/c3ed132e-9b29-4227-b380-b83e0c7d4c43' width=200/> |Viewing Current Status| `git status` | Shows modified and untracked files. | `On branch main Changes not staged for commit: modified: index.html` | `git status -s` | Shows a short summary of the status. | ` M index.html` |
| | | `git show HEAD` | Displays details of the latest commit. | `commit a1b2c3d (HEAD -> main) Author: John Doe Date: Wed Mar 12 2025` | N/A | N/A | N/A |
| **Branching & Switching** | Creating and Switching Branches | `git branch <branch-name>` <br> `git switch <branch-name>` | Creates and switches to a new branch. | `Switched to branch '<branch-name>'` | `git branch -a` | Lists all local and remote branches. | `* main  new-feature` |
| | | `git checkout <branch-name>` | Switches to an existing branch. | `Switched to branch '<branch-name>'` | | | |
| | | `git checkout <commit-hash>` | Switches to a specific commit in detached mode. | `Note: switching to '<commit-hash>'.` | | | |
| | | `git switch --detach <commit-hash>` | Switches to detached HEAD mode. | `HEAD is now at <commit-hash>.` | | | |
| **Merging & Rebasing** | Merging Branches | `git merge <branch-name>` | Merges `<branch-name>` into the current branch. | `Merge made by the 'recursive' strategy.` | `git merge --abort` | Cancels the merge. | `Merge aborted.` |
| | | | | | `git merge --squash <branch-name>` | Combines all commits from the merged branch into one. | `Squash merge successful.` |
| | | | | | `git merge --ff <branch-name>` | Applies a fast-forward merge. | `Fast-forward merge complete.` |
| | | | | | `git merge --no-ff <branch-name>` | Forces a recursive merge. | `Merge with --no-ff strategy complete.` |
| | Rebasing a Branch | `git rebase <branch-name>` | Moves the current branch on top of another. | `Successfully rebased and updated refs/heads/<branch-name>.` | | | |
| **Deleting & Resetting** | Deleting Files from Git | `git rm <filename>` <br> `git commit -m "Deleted <filename>"` | Removes a file from Git. | `rm '<filename>'` | | | |
| | Undoing Unstaged Changes | `git restore <filename>` | Reverts unstaged changes. | `Restored '<filename>'` | | | |
| | Undoing Staged Changes | `git reset <filename>` | Moves file from staged to unstaged. | `Unstaged changes after reset:` | | | |
| | Resetting Commits | `git reset --soft HEAD~1` | Moves HEAD back one commit, keeping changes staged. | `HEAD is now at a1b2c3d Last commit message` | | | |
| **Stashing & Recovering Data** | Stashing Changes | `git stash` | Saves changes temporarily. | `Saved working directory and index state WIP on main: a1b2c3d Initial commit` | `git stash list` | Shows saved stashes. | `stash@{0}: WIP on main` |
| | | | | | `git stash pop` | Applies and removes the last stash. | `Dropped stash@{0}.` |
| | | | | | `git stash apply` | Applies the last stash but keeps it saved. | `Applied stash@{0}.` |
| | Recovering Lost Data | `git reflog` | Shows all HEAD movements. | `a1b2c3d HEAD@{0}: commit: Added new feature` | `git reflog expire --expire=now --all` | Clears the reflog history. | `Reflog cleared.` |
| **Cherry-Picking & Tags** | Cherry-Picking a Commit | `git cherry-pick <commit-hash>` | Applies a specific commit to the current branch. | `[main <commit-hash>] Applied cherry-picked commit` | `git cherry-pick --continue` | Continues cherry-picking after resolving conflicts. | `Cherry-pick continued.` |
| | | | | | `git cherry-pick --abort` | Cancels cherry-picking. | `Cherry-pick aborted.` |
| | Creating Tags | `git tag <tag-name>` <br> `git tag -a <tag-name> -m "<message>"` <br> `git push origin <tag-name>` | Tags a commit and pushes it to remote. | `<tag-name> pushed to remote` | `git tag -d <tag-name>` | Deletes a local tag. | `Deleted tag <tag-name>.` |
| | | | | | `git push --delete origin <tag-name>` | Deletes a remote tag. | `Deleted remote tag <tag-name>.` |



This table is already quite comprehensive, but here are some **additional Git commands and subcommands** that would enhance it further:  

---

### **More Commands to Add:**

#### **Remote Repository Management**
| **Category** | **Module Title** | **Git Command(s)** | **Main Command Result** | **Example of Main Command** | **Subcommands** | **Subcommand Explanations** | **Example of Subcommand** |
|-------------|-----------------|--------------------|------------------|--------------------|----------------|------------------|--------------------|
| **Remote Repository** | Cloning a Repository | `git clone <repo-url>` | Creates a local copy of a remote repository. | `Cloning into '<repo-name>'...` | | | |
| | Adding a Remote | `git remote add origin <repo-url>` | Links a local repo to a remote one. | `Remote "origin" added.` | `git remote -v` | Shows remote URLs linked to the repository. | `origin  https://github.com/user/repo.git (fetch)` |
| | Fetching from Remote | `git fetch` | Retrieves latest changes from remote but does not merge. | `Fetching origin...` | `git fetch --all` | Fetches updates from all remote branches. | `Fetching from all remotes...` |
| | Pulling Changes | `git pull origin <branch>` | Fetches and merges changes from remote. | `Updating a1b2c3d..b4d5e6f` | `git pull --rebase` | Rebase instead of merge when pulling. | `Successfully rebased and updated refs/heads/main.` |
| | Pushing Changes | `git push origin <branch>` | Uploads local commits to remote. | `Everything up-to-date` | `git push --force` | Force pushes changes, overwriting remote history. | `Force-pushed to origin/main` |

---

### **More Advanced Features**

#### **Advanced Branching**
| **Category** | **Module Title** | **Git Command(s)** | **Main Command Result** | **Example of Main Command** | **Subcommands** | **Subcommand Explanations** | **Example of Subcommand** |
|-------------|-----------------|--------------------|------------------|--------------------|----------------|------------------|--------------------|
| **Advanced Branching** | Creating a New Branch and Checking Out Simultaneously | `git checkout -b <branch-name>` | Creates and switches to a new branch. | `Switched to a new branch '<branch-name>'` | | | |
| | Tracking a Remote Branch | `git branch --track <new-local-branch> <remote-branch>` | Creates a local branch tracking a remote one. | `Branch '<new-local-branch>' set up to track '<remote-branch>'` | | | |
| | Deleting a Remote Branch | `git push origin --delete <branch-name>` | Deletes a branch from the remote repository. | `Deleted branch <branch-name> (was a1b2c3d).` | | | |

---

#### **Interactive Rebase & History Editing**
| **Category** | **Module Title** | **Git Command(s)** | **Main Command Result** | **Example of Main Command** | **Subcommands** | **Subcommand Explanations** | **Example of Subcommand** |
|-------------|-----------------|--------------------|------------------|--------------------|----------------|------------------|--------------------|
| **History Editing** | Interactive Rebase | `git rebase -i HEAD~3` | Opens an interactive rebase session for the last 3 commits. | `[pick] [reword] [squash] [edit]` | `git rebase --skip` | Skips a commit during rebase. | `Successfully rebased.` |
| | Reverting a Commit | `git revert <commit-hash>` | Creates a new commit that undoes a previous commit. | `Revert "Commit message"` | `git revert --no-commit <commit-hash>` | Reverts changes but does not commit. | `Reverted commit <commit-hash>.` |

---

Would you like me to **add these to your table** or **format them differently**? 🚀