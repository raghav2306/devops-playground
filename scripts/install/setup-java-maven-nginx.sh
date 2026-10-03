#!/bin/bash
set -e

echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo "Installing Nginx..."
sudo apt install -y nginx

echo "Enabling and starting Nginx..."
sudo systemctl enable nginx
sudo systemctl start nginx

echo "Installing JDK..."
sudo apt install -y openjdk-17-jdk

echo "Installing Maven..."
sudo apt install -y maven

echo "Verifying installations..."
echo "Java version:"
java -version
echo "Maven version:"
mvn -v
echo "Nginx version:"
nginx -v

echo "Installation complete!"
