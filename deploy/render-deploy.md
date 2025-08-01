# Render Deployment Guide

## 1. Create Render Account

- Sign up at https://render.com

## 2. Connect GitHub

- Connect GitHub account
- Select repository

## 3. Create Web Service

- **Name**: property-pilot-backend
- **Environment**: Node
- **Build Command**: `cd backend && pnpm install && pnpm build`
- **Start Command**: `cd backend && node dist/index.js`
- **Root Directory**: `backend`

## 4. Environment Variables

- `PORT`: 5000
- `NODE_ENV`: production
- `CORS_ORIGIN`: https://your-frontend-domain.vercel.app

## 5. Auto Deployment

- Automatic deployment when pushing to GitHub
- Free tier: 750 hours/month
