# Deployment Guide

## GitHub Repository Link
✅ **Repository:** https://github.com/goururakesh/Drag-and-Drop-Report-Builder.git

## Live Demo Deployment Options

### Option 1: Deploy to Vercel (Recommended - Easiest)

#### Method A: Using Vercel Web Interface (No CLI needed)

1. **Go to Vercel:** Visit https://vercel.com and sign in with GitHub
2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import from GitHub
   - Select repository: `goururakesh/Drag-and-Drop-Report-Builder`
3. **Configure Project:**
   - Framework Preset: **Other** or leave as default
   - Root Directory: `./` (default)
   - Build Command: Leave empty (static site)
   - Output Directory: Leave empty
4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment (usually 1-2 minutes)
   - Your site will be live at: `https://drag-and-drop-report-builder-xxx.vercel.app`

#### Method B: Using Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```
   - This will open a browser window for authentication

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Deploy to production: `vercel --prod`

4. **Get your live URL:**
   - Vercel will provide you with a deployment URL
   - Example: `https://drag-and-drop-report-builder.vercel.app`

---

### Option 2: Deploy to Netlify

#### Method A: Using Netlify Web Interface

1. **Go to Netlify:** Visit https://www.netlify.com and sign in with GitHub
2. **Add New Site:**
   - Click "Add new site" → "Import an existing project"
   - Select "Deploy with GitHub"
   - Authorize Netlify to access your GitHub
   - Select repository: `Drag-and-Drop-Report-Builder`
3. **Configure Build Settings:**
   - Build command: Leave empty (static site)
   - Publish directory: `/` (root)
4. **Deploy:**
   - Click "Deploy site"
   - Wait for deployment
   - Your site will be live at: `https://drag-and-drop-report-builder-xxx.netlify.app`

#### Method B: Using Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

---

### Option 3: Deploy to GitHub Pages

1. **Go to your GitHub repository**
2. **Settings → Pages**
3. **Source:** Select "Deploy from a branch"
4. **Branch:** Select `main` and `/ (root)`
5. **Save**
6. **Your site will be live at:**
   `https://goururakesh.github.io/Drag-and-Drop-Report-Builder/`

---

## Quick Start (Recommended: Vercel Web Interface)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import `Drag-and-Drop-Report-Builder`
5. Click "Deploy"
6. Done! Your site is live in ~1 minute

---

## Your Deliverables

✅ **GitHub Repository:** https://github.com/goururakesh/Drag-and-Drop-Report-Builder.git

🔗 **Live Demo:** (Will be provided after deployment)
- Vercel: `https://drag-and-drop-report-builder.vercel.app` (or custom domain)
- Netlify: `https://drag-and-drop-report-builder.netlify.app` (or custom domain)
- GitHub Pages: `https://goururakesh.github.io/Drag-and-Drop-Report-Builder/`

---

## Notes

- **Vercel** is recommended for fastest deployment and best performance
- All platforms support **automatic deployments** on git push
- You can customize the domain name in the platform settings
- All platforms offer free hosting for static sites

