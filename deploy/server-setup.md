# Property Pilot Server Setup Guide

## 1. Basic Server Setup

```bash
# System update
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Install nginx
sudo apt install nginx -y

# Create application directory
sudo mkdir -p /var/www/property-pilot
sudo chown -R $USER:$USER /var/www/property-pilot
```

## 2. SSH Key Setup

```bash
# Generate SSH key (on local machine)
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Copy public key to server
ssh-copy-id username@your-server-ip
```

## 3. GitHub Actions Secrets Setup

Add the following secrets in GitHub repository → Settings → Secrets and variables → Actions:

- `SSH_PRIVATE_KEY`: Server SSH private key (full content)
- `SERVER_HOST`: Server IP address or domain
- `SERVER_USER`: Server username (usually ubuntu, root, or www-data)

## 4. Run Server Setup Script

```bash
# Give script execution permission
chmod +x deploy/setup-server.sh

# Run server setup
./deploy/setup-server.sh
```

## 5. Firewall Configuration

```bash
# Enable UFW firewall
sudo ufw enable

# Allow SSH
sudo ufw allow ssh

# Allow HTTP/HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Check firewall status
sudo ufw status
```

## 6. SSL Certificate Setup (Optional)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Issue SSL certificate
sudo certbot --nginx -d your-domain.com
```

## 7. Deployment Verification

```bash
# Check service status
sudo systemctl status property-pilot-frontend
sudo systemctl status property-pilot-backend
sudo systemctl status nginx

# Check logs
sudo journalctl -u property-pilot-frontend -f
sudo journalctl -u property-pilot-backend -f
```

## 8. Manual Deployment (if needed)

```bash
# Clone code from GitHub
cd /var/www
sudo git clone https://github.com/silverraining/property-pilot.git
sudo chown -R www-data:www-data property-pilot

# Build frontend
cd property-pilot
pnpm install
pnpm build

# Build backend
cd backend
pnpm install
pnpm build

# Restart services
sudo systemctl restart property-pilot-frontend
sudo systemctl restart property-pilot-backend
```
