# Property Pilot - Vercel Deployment Guide

## Overview

Frontend-only application with client-side calculations, optimized for Vercel deployment.

## Major Changes

- Removed all backend dependencies
- Client-side calculations for instant performance
- Optimized for Vercel deployment
- Simplified project structure

## Deployment Methods

### 1. Vercel CLI Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### 2. Vercel Dashboard Deployment

1. Go to https://vercel.com
2. Connect your GitHub repository
3. Import the project
4. Deploy automatically

### 3. GitHub Integration

- Push to main branch triggers automatic deployment
- No additional configuration needed

## Project Structure

```
property-pilot/
├── src/
│   ├── app/                    # Next.js app router
│   ├── components/             # React components
│   ├── utils/
│   │   ├── api.ts             # Client-side API functions
│   │   └── calculations.ts    # Calculation logic
│   └── i18n/                  # Internationalization
├── public/                     # Static assets
├── package.json               # Dependencies
└── next.config.ts            # Next.js configuration
```

## Performance Features

- Instant calculation without server requests
- No network latency
- Offline calculation capability
- Optimized bundle size (~100kB)

## Available Calculators

- **Closing Costs Calculator**: Calculate property closing costs
- **Mortgage Calculator**: Estimate monthly mortgage payments
- **Occupancy Costs Calculator**: Calculate occupancy fees
- **Rental ROI Calculator**: Analyze rental property returns

## Environment Variables

No environment variables required - all calculations are client-side.

## Build Process

```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# Start development server
pnpm dev
```

## Deployment URL

- **Production**: https://maplenamu-realestate-knyl8hzlw-eunbs-projects.vercel.app
- **Inspect**: https://vercel.com/eunbs-projects/maplenamu-realestate
