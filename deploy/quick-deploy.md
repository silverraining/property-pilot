# 빠른 MVP 배포 가이드

## 🚀 5분 배포 방법

### 백엔드 배포 (Railway) - 3분
1. https://railway.app 에서 가입
2. "New Project" → "Deploy from GitHub repo"
3. `silverraining/property-pilot` 선택
4. **Settings**에서:
   - **Root Directory**: `backend`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `node dist/index.js`
5. **Variables**에서:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
6. 배포 완료 후 URL 복사 (예: `https://property-pilot-backend-production.up.railway.app`)

### 프론트엔드 배포 (Vercel) - 2분
1. https://vercel.com 에서 가입
2. "New Project" → GitHub repo 선택
3. **Framework Preset**: `Next.js`
4. **Environment Variables**에서:
   - `NEXT_PUBLIC_API_URL`: 백엔드 URL 입력
5. 배포 완료!

## 🔄 자동 배포
- GitHub에 푸시하면 자동으로 두 플랫폼 모두 배포됨
- 클라이언트에게 바로 URL 전달 가능

## 💰 비용
- **Railway**: $5 크레딧/월 (무료)
- **Vercel**: 무료
- **총 비용**: $0 