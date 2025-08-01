# Property Pilot - Frontend Only Deployment

## Overview

Version with backend dependencies removed and changed to client-side calculations.

## Major Changes

- Changed backend API calls to client-side calculations
- Changed URL to `/portfolios/real-estate`
- Improved calculation speed

## Deployment Methods

### 1. Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Netlify Deployment

```bash
# Build
npm run build

# Deploy to Netlify (using Netlify CLI)
netlify deploy --prod
```

### 3. Static Hosting

```bash
# Build
npm run build

# Generate static files
npm run export

# Upload dist folder to web server
```

## Environment Configuration

- `NEXT_PUBLIC_BASE_PATH`: `/portfolios/real-estate` (default)
- Backend environment variables removed

## Performance Improvements

- Instant calculation without server requests
- No network latency
- Calculations possible even offline

## URL Structure

- Main: `maplenamu.com/portfolios/real-estate`
- Closing Costs: `maplenamu.com/portfolios/real-estate/closing-costs`
- Mortgage: `maplenamu.com/portfolios/real-estate/mortgage`
- Occupancy Costs: `maplenamu.com/portfolios/real-estate/occupancy-cost-calculator`
- Rental ROI: `maplenamu.com/portfolios/real-estate/rental-roi`
