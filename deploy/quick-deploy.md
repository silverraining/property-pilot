# Quick MVP Deployment Guide

## 🚀 5-Minute Deployment Method

### Backend Deployment (Railway) - 3 minutes

1. Sign up at https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Select `silverraining/property-pilot`
4. In **Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `node dist/index.js`
5. In **Variables**:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
6. Copy URL after deployment (e.g., `https://property-pilot-backend-production.up.railway.app`)

### Frontend Deployment (Vercel) - 2 minutes

1. Sign up at https://vercel.com
2. "New Project" → Select GitHub repo
3. **Framework Preset**: `Next.js`
4. In **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Enter backend URL
5. Deployment complete!

## 🔄 Auto Deployment

- Both platforms deploy automatically when pushing to GitHub
- Can immediately provide URL to client

## 💰 Cost

- **Railway**: $5 credit/month (free)
- **Vercel**: Free
- **Total Cost**: $0
