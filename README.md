# 🌸 Bloom Store Platform

Small business storefronts with UPI payments, built on Supabase.

## Project Structure
```
bloom-store/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
├── public/
│   └── bloom-icon.svg
└── src/
    ├── main.jsx
    └── App.jsx
```

## Deploy Steps

### 1. Create the folder on your computer
Make a new folder called `bloom-store` anywhere on your computer.

### 2. Put the files in
Copy all these files into that folder, keeping the `src/` and `public/` subfolders.

### 3. Push to GitHub
Go to github.com → New Repository → name it `bloom-store` → Create.

Then open Terminal (Mac) or Command Prompt (Windows) in your folder and run:
```bash
git init
git add .
git commit -m "Initial Bloom commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bloom-store.git
git push -u origin main
```

### 4. Deploy on Vercel
1. Go to vercel.com
2. Click "Add New Project"
3. Click "Import" next to your bloom-store repo
4. Click "Deploy" — no settings to change, vercel.json handles everything
5. Done! Your URL is live: `bloom-store.vercel.app`

## Supabase
Run `bloom-setup.sql` once in Supabase SQL Editor before first use.
