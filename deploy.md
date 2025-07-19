# Quick Deployment Guide

## Option 1: Netlify Drag & Drop (2 minutes)

1. **Prepare your files**:
   - Ensure you have: `index.html`, `styles.css`, `script.js`, `README.md`
   - Put them all in a single folder

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up for free
   - Drag your project folder to the "Deploy" area
   - Get instant live URL

3. **Custom domain** (optional):
   - Go to Site Settings → Domain Management
   - Add your custom domain

## Option 2: GitHub Pages (Best for long-term)

1. **Create repository**:
   ```bash
   # If you have git installed
   git init
   git add .
   git commit -m "Initial compliance website"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/compliance-website.git
   git push -u origin main
   ```

2. **Enable Pages**:
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Save

3. **Access your site**:
   - URL: `https://YOURUSERNAME.github.io/compliance-website`

## Option 3: One-Click Deploy Buttons

Add these to your README.md:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOURUSERNAME/compliance-website)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOURUSERNAME/compliance-website)

## Custom Domain Setup

Once hosted, you can add your own domain:

1. **Purchase domain** (optional):
   - Namecheap, GoDaddy, or Google Domains
   - Cost: $10-15/year

2. **Configure DNS**:
   - Point your domain to your hosting service
   - Most services provide detailed instructions

## Performance Tips

- Your website is already optimized for fast loading
- Uses CDN for Font Awesome icons
- Minimal dependencies
- Mobile-responsive design

## SSL Certificate

All mentioned services provide free SSL certificates automatically, so your site will be secure with HTTPS. 