# Jenkins + SonarQube + Docker pipeline

A declarative Jenkins pipeline for a TypeScript Express app.

## Stages

1. **Checkout** the repo using the `github-creds` credential.
2. **Install and test** inside a `node:22-slim` container (`npm ci`, `npm run test`).
3. **Static analysis** with `sonar-scanner` in a container, using the `sonarqube` token credential.
4. **Build image** with the multi-stage `Dockerfile`, tagged with the build number.
5. **Push** to Docker Hub using the `docker-hub` credential.

## Setup

Server setup is covered in [`scripts/`](../../scripts):

- `scripts/install/install-jenkins.sh` and `install-sonarqube.sh`
- `scripts/guides/jenkins/` for GitHub webhook, Docker plugin and SonarQube connection

In the `Jenkinsfile`, replace `<SONARQUBE_HOST>` with your SonarQube server and set `DOCKER_IMAGE` to your Docker Hub repo. In the Jenkins job, point **Script Path** at `ci-cd/jenkins-sonarqube-docker/Jenkinsfile`.

## Credentials used

| ID | Type |
|---|---|
| `github-creds` | Username + token |
| `sonarqube` | Secret text |
| `docker-hub` | Username + password |

No secrets are stored in this repo.
