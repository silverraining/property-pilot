# Render 배포 가이드

## 1. Render 계정 생성

- https://render.com 에서 가입

## 2. GitHub 연동

- GitHub 계정 연결
- 레포지토리 선택

## 3. Web Service 생성

- **Name**: property-pilot-backend
- **Environment**: Node
- **Build Command**: `cd backend && pnpm install && pnpm build`
- **Start Command**: `cd backend && node dist/index.js`
- **Root Directory**: `backend`

## 4. 환경변수 설정

- `PORT`: 5000
- `NODE_ENV`: production
- `CORS_ORIGIN`: https://your-frontend-domain.vercel.app

## 5. 자동 배포

- GitHub에 푸시하면 자동 배포
- 무료 티어: 750시간/월
