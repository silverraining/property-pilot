# Property Pilot 배포 가이드 (Render + Vercel)

## 🚀 배포 구조

- **백엔드**: Render에서 Express.js 서버로 배포
- **프론트엔드**: Vercel에서 Next.js로 배포
- **API 통신**: 프론트엔드에서 Render 백엔드 API 호출

## 📋 백엔드 배포 (Render)

### 1. Render 계정 생성
- https://render.com 에서 가입

### 2. GitHub 연동
- GitHub 계정 연결
- `silverraining/property-pilot` 레포지토리 선택

### 3. Web Service 생성
- **Name**: `property-pilot-backend`
- **Environment**: `Node`
- **Build Command**: `cd backend && pnpm install && pnpm build`
- **Start Command**: `cd backend && node dist/index.js`
- **Root Directory**: `backend`

### 4. 환경변수 설정
- `PORT`: `5000`
- `NODE_ENV`: `production`
- `CORS_ORIGIN`: `https://your-frontend-domain.vercel.app`

### 5. 배포 확인
- Render 대시보드에서 배포 상태 확인
- 백엔드 URL 복사 (예: `https://property-pilot-backend.onrender.com`)

## 🌐 프론트엔드 배포 (Vercel)

### 1. Vercel 계정 생성
- https://vercel.com 에서 가입

### 2. GitHub 연동
- GitHub 계정 연결
- `silverraining/property-pilot` 레포지토리 선택

### 3. 프로젝트 설정
- **Framework Preset**: `Next.js`
- **Root Directory**: `./` (기본값)
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`

### 4. 환경변수 설정
- `NEXT_PUBLIC_API_URL`: `https://your-backend-url.onrender.com`

### 5. 배포 확인
- Vercel 대시보드에서 배포 상태 확인
- 프론트엔드 URL 복사 (예: `https://property-pilot.vercel.app`)

## 🔄 자동 배포

### GitHub 푸시 시 자동 배포
```bash
# 코드 변경 후
git add .
git commit -m "Update code"
git push origin main
```

- **백엔드**: Render에서 자동으로 새 버전 배포
- **프론트엔드**: Vercel에서 자동으로 새 버전 배포

## 🧪 배포 테스트

### 1. 백엔드 API 테스트
```bash
curl https://your-backend-url.onrender.com/api/health
```

### 2. 프론트엔드 테스트
- 브라우저에서 프론트엔드 URL 접속
- 계산기 기능 테스트

## 🛠️ 문제 해결

### 백엔드 배포 실패
- Render 로그 확인
- 환경변수 설정 확인
- Build Command 확인

### 프론트엔드 배포 실패
- Vercel 로그 확인
- API URL 환경변수 확인
- Build Command 확인

### API 연결 실패
- CORS 설정 확인
- API URL 환경변수 확인
- 네트워크 연결 확인
