# Git Repository Setup Guide 🚀

Git is not currently installed on your system. Follow this guide to install Git, create a repository, and optionally push to GitHub!

---

## Step 1: Install Git

### Download and Install

1. **Download Git for Windows:**
   - Go to: https://git-scm.com/download/win
   - Click "Click here to download" (64-bit version)
   - Run the installer

2. **Installation Options:**
   - ✅ Use recommended settings (just click "Next")
   - ✅ Choose "Git from the command line and also from 3rd-party software"
   - ✅ Use "Windows' default console window"
   - ✅ Leave other options as default

3. **Verify Installation:**
   - Open a **new** PowerShell window (important!)
   - Run: `git --version`
   - Should show: `git version 2.x.x`

---

## Step 2: Configure Git (First Time Only)

Open PowerShell and run these commands with **your information**:

```powershell
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Verify settings
git config --list
```

---

## Step 3: Initialize Local Repository

Navigate to your project and create a Git repository:

```powershell
# Go to your project folder
cd "C:\Users\amwin\OneDrive\Desktop\My Project\blog-website"

# Initialize Git repository
git init

# Check status
git status
```

You should see all your files listed as "untracked".

---

## Step 4: Make Your First Commit

```powershell
# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Modern blog website with AI practices"

# View commit history
git log --oneline
```

**✅ Congratulations!** You now have a local Git repository with version control!

---

## Step 5: Create GitHub Repository (Optional)

### A. Create Repository on GitHub

1. **Go to GitHub:**
   - Visit: https://github.com/
   - Sign up or log in

2. **Create New Repository:**
   - Click the "+" icon → "New repository"
   - **Repository name:** `modern-blog-website` (or your choice)
   - **Description:** "Modern blog website with AI best practices and animations"
   - **Visibility:** Public (or Private if you prefer)
   - ❌ **Don't** initialize with README (you already have files)
   - Click "Create repository"

### B. Connect Local to GitHub

GitHub will show you commands. Use the "push an existing repository" section:

```powershell
# Add GitHub as remote origin (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/modern-blog-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Enter your GitHub credentials when prompted.**

### C. Use Personal Access Token (Recommended)

GitHub no longer accepts passwords. You need a Personal Access Token (PAT):

1. **Create Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name: "Blog Website Deployment"
   - Expiration: 90 days (or your preference)
   - Scopes: Check ✅ **repo** (full control of private repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Use Token as Password:**
   - When git asks for password, paste your token
   - Windows will save it in Credential Manager

---

## Step 6: Deploy to Netlify from GitHub (Best Method!)

Once your code is on GitHub:

1. **In Netlify Dashboard:**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify to access your repos
   - Select `modern-blog-website`

2. **Configure Build:**
   - Build command: (leave empty)
   - Publish directory: `.` or `/`
   - Click "Deploy site"

3. **Benefits:**
   - ✅ Automatic deployments when you push changes
   - ✅ Preview deployments for branches
   - ✅ Easy rollbacks
   - ✅ Version history

---

## Common Git Commands

### Daily Workflow

```powershell
# Check what changed
git status

# Add specific file
git add filename.html

# Add all changes
git add .

# Commit changes
git commit -m "Add new blog post about AI ethics"

# Push to GitHub
git push

# Pull latest changes (if working with others)
git pull
```

### Viewing History

```powershell
# View commit history
git log

# View compact history
git log --oneline

# View changes in a file
git diff filename.html
```

### Branches (Advanced)

```powershell
# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# Merge branch into main
git checkout main
git merge feature-name
```

---

## Your Project Files

I've created a `.gitignore` file that excludes:
- ✅ System files (`.DS_Store`, `Thumbs.db`)
- ✅ Editor configs (`.vscode/`, `.idea/`)
- ✅ Build artifacts (`node_modules/`, `dist/`)
- ✅ Environment files (`.env`)
- ✅ Netlify cache (`.netlify/`)

**All your important files will be tracked:**
- HTML pages (index, blog, gallery, ai-practices, post)
- CSS files (styles, responsive, animations)
- JavaScript files (main, blog, gallery)
- Data files (posts.json)
- Documentation (README, guides)

---

## Quick Start Steps

1. **Install Git** (5 minutes)
   - Download from git-scm.com
   - Run installer with defaults
   - Restart PowerShell

2. **Setup Git** (1 minute)
   ```powershell
   git config --global user.name "Your Name"
   git config --global user.email "your@email.com"
   ```

3. **Create Local Repo** (1 minute)
   ```powershell
   cd "C:\Users\amwin\OneDrive\Desktop\My Project\blog-website"
   git init
   git add .
   git commit -m "Initial commit: Modern blog website"
   ```

4. **Push to GitHub** (5 minutes)
   - Create repo on GitHub
   - Get Personal Access Token
   - Push your code

5. **Deploy to Netlify** (2 minutes)
   - Connect Netlify to GitHub
   - Auto-deploy enabled!

---

## Benefits of Using Git + GitHub

✅ **Version Control** - Track all changes, revert if needed  
✅ **Backup** - Your code is safe in the cloud  
✅ **Collaboration** - Easy to work with others  
✅ **Automatic Deployments** - Push to GitHub → Auto-deploy to Netlify  
✅ **Portfolio** - Showcase your work publicly  
✅ **Professional** - Industry-standard workflow  

---

## Troubleshooting

**"Git is not recognized"**
- Restart PowerShell/Terminal after installing Git
- Or restart your computer

**"Authentication failed"**
- Use Personal Access Token, not password
- Create token at: https://github.com/settings/tokens

**"Permission denied"**
- Make sure you're the owner of the GitHub repo
- Check your token has `repo` permissions

**"Already exists" error on GitHub**
- Choose a different repository name
- Or delete the existing repo first

---

## Next Steps After Setup

Once Git is working:

```powershell
# Make a change to your site
# (edit a file)

# Track and commit the change
git add .
git commit -m "Updated blog post"

# Push to GitHub (if connected)
git push

# Netlify automatically deploys! 🚀
```

---

## Resources

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/
- **Git Cheat Sheet:** https://education.github.com/git-cheat-sheet-education.pdf
- **Learn Git Branching:** https://learngitbranching.js.org/

---

**Ready to get started?** Install Git, then run the commands in Step 3! 🎉
