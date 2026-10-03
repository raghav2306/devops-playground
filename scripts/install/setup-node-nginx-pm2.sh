#!/bin/bash

set -e

echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo "Installing Nginx..."
sudo apt install -y nginx

echo "Enabling and starting Nginx..."
sudo systemctl enable nginx
sudo systemctl start nginx

echo "Installing curl (required for Node.js setup)..."
sudo apt install -y curl

echo "Fetching Node.js LTS version setup script..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

echo "Installing Node.js (LTS)..."
sudo apt install -y nodejs
sudo npm install -g npm@11.6.1

echo "Installing pm2 globally..."
sudo npm install -g pm2

echo "Verifying installations..."
echo -n "Node.js version: "; node -v
echo -n "npm version: "; npm -v
echo -n "Nginx version: "; nginx -v

echo "Installation complete!"



