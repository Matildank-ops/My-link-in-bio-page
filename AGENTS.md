# Project guidance

This repository publishes the static site at `https://www.gotilda.com/` through GitHub Pages. The GitHub repository is `Matildank-ops/My-link-in-bio-page`, and `main` is the publishing branch.

## GitHub access and publishing

- The GitHub connector is authorized for this repository and has successfully published changes to `main`. Check its current repository permissions before writing.
- Terminal Git uses an HTTPS remote. On this Mac, `git push origin main` has failed with `could not read Username for 'https://github.com': Device not configured`. This does not mean the GitHub connector lacks access. Try the connector before asking the user to set up terminal credentials.
- For a connector publish, confirm that remote `main` still matches the intended parent commit. Create blobs for changed files, create a tree based on the remote parent's tree, create a commit with that parent, and move `main` with a non-forced `github_update_ref` call. Verify blob and tree SHAs against the local Git objects when publishing a local commit.
- A connector-created commit may have a different SHA from the equivalent local commit. Once the remote commit is published, fetch `main`; if the working tree is clean and the local and remote tree SHAs match, update the local branch to the remote commit so the checkout stays in sync.
- Confirm the GitHub Pages deployment succeeded and check the affected public URLs before reporting that a change is live.
