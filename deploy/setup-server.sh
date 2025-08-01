#!/bin/bash

# Property Pilot Server Setup Script

echo "Setting up Property Pilot server..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Create application directory
sudo mkdir -p /var/www/property-pilot
sudo chown -R $USER:$USER /var/www/property-pilot

# Create systemd service files
sudo tee /etc/systemd/system/property-pilot-frontend.service > /dev/null <<EOF
[Unit]
Description=Property Pilot Frontend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/property-pilot
ExecStart=/usr/bin/node /var/www/property-pilot/node_modules/.bin/next start -p 3000
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF

sudo tee /etc/systemd/system/property-pilot-backend.service > /dev/null <<EOF
[Unit]
Description=Property Pilot Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/property-pilot/backend
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=5000

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and enable services
sudo systemctl daemon-reload
sudo systemctl enable property-pilot-frontend
sudo systemctl enable property-pilot-backend

# Create nginx configuration
sudo tee /etc/nginx/sites-available/property-pilot > /dev/null <<EOF
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable nginx site
sudo ln -sf /etc/nginx/sites-available/property-pilot /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

echo "Server setup complete!"
echo "Don't forget to:"
echo "1. Replace 'your-domain.com' in nginx config with your actual domain"
echo "2. Set up SSL certificate with Let's Encrypt"
echo "3. Configure firewall rules" 