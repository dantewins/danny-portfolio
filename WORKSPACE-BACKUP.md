# Workspace backup of portfolio
 
The Git branch `main` contains the working source. The [November 21, 2026 recovery release](https://github.com/dantewins/danny-portfolio/releases/tag/workspace-backup-2026-11-21) also contains an encrypted snapshot of the local folder before the backup commit. It includes files covered by existing Git ignore rules, generated artifacts, empty directories, and any local Git metadata present at capture. Use the archive to recover the original checkout and its local state.

## Exclusions

The snapshot omits directories named `node_modules`, files named `.env`, and local `.env.*` variants. Example, sample, and template environment files are included. The following paths matched at capture.

- `node_modules`

## Restore on macOS

For the working source, clone the repository and check out `main`. For the full original folder, install GitHub CLI, age, and zstd and authenticate GitHub CLI with access to this repository. Run the following commands from a directory with space for the restored folder. Use fresh destination directories. The identity file is held separately by the owner.

```sh
mkdir backup-download && cd backup-download
gh release download workspace-backup-2026-11-21 --repo dantewins/danny-portfolio
shasum -a 256 -c SHA256SUMS
mkdir ../restored-project
set -o pipefail
cat snapshot.tar.zst.age* | age -d -i "$HOME/.config/github-project-backup/2026-11-21.agekey" | zstd -dc | tar -xpf - -C ../restored-project
```

Reinstall dependencies from the project lockfiles as needed. Supply any excluded local environment settings separately. If the original checkout had a different remote or no remote, its archived Git configuration reflects that original state.
