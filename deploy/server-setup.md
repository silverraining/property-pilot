# Property Pilot Server Setup Guide

## 1. 서버 기본 설정

```bash
# 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# Node.js 20 설치
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# pnpm 설치
npm install -g pnpm

# nginx 설치
sudo apt install nginx -y

# 애플리케이션 디렉토리 생성
sudo mkdir -p /var/www/property-pilot
sudo chown -R $USER:$USER /var/www/property-pilot
```

## 2. SSH 키 설정

```bash
# SSH 키 생성 (로컬에서)
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# 서버에 공개키 복사
ssh-copy-id username@your-server-ip
```

## 3. GitHub Actions 시크릿 설정

GitHub 레포지토리 → Settings → Secrets and variables → Actions에서 다음 시크릿 추가:

- `SSH_PRIVATE_KEY`: 서버 SSH 개인키 (전체 내용)
- `SERVER_HOST`: 서버 IP 주소 또는 도메인
- `SERVER_USER`: 서버 사용자명 (보통 ubuntu, root, 또는 www-data)

## 4. 서버 설정 스크립트 실행

```bash
# 스크립트 실행 권한 부여
chmod +x deploy/setup-server.sh

# 서버 설정 실행
./deploy/setup-server.sh
```

## 5. 방화벽 설정

```bash
# UFW 방화벽 활성화
sudo ufw enable

# SSH 허용
sudo ufw allow ssh

# HTTP/HTTPS 허용
sudo ufw allow 80
sudo ufw allow 443

# 방화벽 상태 확인
sudo ufw status
```

## 6. SSL 인증서 설정 (선택사항)

```bash
# Certbot 설치
sudo apt install certbot python3-certbot-nginx -y

# SSL 인증서 발급
sudo certbot --nginx -d your-domain.com
```

## 7. 배포 확인

```bash
# 서비스 상태 확인
sudo systemctl status property-pilot-frontend
sudo systemctl status property-pilot-backend
sudo systemctl status nginx

# 로그 확인
sudo journalctl -u property-pilot-frontend -f
sudo journalctl -u property-pilot-backend -f
```

## 8. 수동 배포 (필요시)

```bash
# GitHub에서 코드 클론
cd /var/www
sudo git clone https://github.com/silverraining/property-pilot.git
sudo chown -R www-data:www-data property-pilot

# 프론트엔드 빌드
cd property-pilot
pnpm install
pnpm build

# 백엔드 빌드
cd backend
pnpm install
pnpm build

# 서비스 재시작
sudo systemctl restart property-pilot-frontend
sudo systemctl restart property-pilot-backend
```
