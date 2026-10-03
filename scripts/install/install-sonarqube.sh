#!/bin/bash

set -e

# Step 1: Install Java 17
echo "Installing Java 17..."
sudo apt update
sudo apt install -y openjdk-17-jdk unzip wget

# Step 2: Create a sonar user (interactive password prompt)
echo "Creating sonar user..."
sudo adduser sonarqube
echo "Set password for sonarqube user:"
sudo passwd sonarqube

# Step 3: Switch to the 'sonarqube' user
echo "Switching to 'sonarqube' user..."
sudo su - sonarqube

# Step 4: Download and extract SonarQube
SONAR_VERSION="10.4.1.88267"
SONAR_ZIP="sonarqube-${SONAR_VERSION}.zip"
SONAR_URL="https://binaries.sonarsource.com/Distribution/sonarqube/${SONAR_ZIP}"

echo "Downloading SonarQube..."
wget $SONAR_URL
unzip $SONAR_ZIP

# Step 4: Move to a proper directory inside home
mkdir -p ~/sonarqube
mv "sonarqube-${SONAR_VERSION}" ~/sonarqube/

# Step 5: Start SonarQube
echo "Starting SonarQube..."
~/sonarqube/sonarqube-${SONAR_VERSION}/bin/linux-x86-64/sonar.sh start

echo "SonarQube started successfully!"
echo "🌐 Visit http://localhost:9000 (Default: admin / admin)"
