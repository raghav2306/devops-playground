# Scripts and setup guides

## `install/` (Ubuntu)

| Script | Installs |
|---|---|
| `setup-docker.sh` | Docker |
| `install-jenkins.sh` | Jenkins |
| `install-sonarqube.sh` | Java 17 and SonarQube |
| `setup-node-nginx-pm2.sh` | Nginx, Node.js LTS, PM2 |
| `setup-java-maven-nginx.sh` | Java, Maven, Nginx |

Run on a fresh Ubuntu server, for example: `bash install/setup-docker.sh`. Read a script before running it on a machine you care about.

## `guides/`

Step-by-step notes for Jenkins (setup, GitHub connection and webhook, Docker plugin, SonarQube connection) and the AWS CLI (install, named profiles).
