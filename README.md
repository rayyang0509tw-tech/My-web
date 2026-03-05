# Assignment 2 Website

Static website built with plain HTML/CSS/JavaScript.

## Files
- `index.html`
- `styles.css`
- `index.js`

## Run locally
Open `index.html` directly in your browser.

## Publish on GitHub (Public Link)
1. Create a new GitHub repository (for example: `assignment2-website`).
2. In terminal, from this folder:

```bash
cd "/Users/rayyang._.0509/Desktop/ABC_Dashboard_Ray Yang/assignment2-website"
git init
git add .
git commit -m "Initial assignment website"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git push -u origin main
```

3. On GitHub, open your repo and go to `Settings` -> `Pages`.
4. Under `Build and deployment`:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Save and wait about 1-3 minutes.
6. Your public site URL will be:

```text
https://<YOUR_USERNAME>.github.io/<YOUR_REPO>/
```

## Customize
Edit the `assignments` array in `index.js` with your real courses and due dates.
