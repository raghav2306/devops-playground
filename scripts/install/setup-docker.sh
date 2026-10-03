#!/bin/bash

set -e

echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo "Installing Docker..."
if ! command -v docker &> /dev/null; then
  sudo apt install -y docker.io
  sudo systemctl enable docker
  sudo systemctl start docker
else
  echo "Docker is already installed."
fi

echo "Checking Docker status..."
sudo systemctl status docker --no-pager

echo "Adding current user to docker group..."
sudo usermod -aG docker "$USER"

echo "Docker installed and user '$USER' added to docker group."
echo "You must log out and log back in (or run 'newgrp docker') to apply group changes."

echo "Restarting the system..."
sudo reboot

echo "Docker setup complete!"
