#!/bin/bash

set -e

echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo "Installing Java (OpenJDK 17)..."
sudo apt install -y openjdk-17-jdk

echo "Java version:"
java -version

echo "Adding Jenkins repository key..."
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo "Adding Jenkins repository..."
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

echo "Updating package index..."
sudo apt update

echo "Installing Jenkins..."
sudo apt install -y jenkins

echo "Starting and enabling Jenkins service..."
sudo systemctl start jenkins
sudo systemctl enable jenkins

echo "Jenkins status:"
sudo systemctl status jenkins | grep Active

echo "Jenkins installation complete!"
