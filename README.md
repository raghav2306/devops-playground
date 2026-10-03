# DevOps Playground

[![Go CI](https://github.com/raghav2306/devops-playground/actions/workflows/go-ci.yml/badge.svg)](https://github.com/raghav2306/devops-playground/actions/workflows/go-ci.yml)
[![Node CI](https://github.com/raghav2306/devops-playground/actions/workflows/node-ci.yml/badge.svg)](https://github.com/raghav2306/devops-playground/actions/workflows/node-ci.yml)
[![Django CI](https://github.com/raghav2306/devops-playground/actions/workflows/django-ci.yml/badge.svg)](https://github.com/raghav2306/devops-playground/actions/workflows/django-ci.yml)

Hands-on labs for the delivery side of backend work: containerizing apps, building CI/CD pipelines, and setting up servers. Each folder is a small, runnable example with its own README.

## What's inside

| Folder | What it shows | Tools |
|---|---|---|
| [`docker/`](docker) | The same Node app built four ways: Ubuntu base, Node base, multi-stage, distroless | Docker |
| [`ci-cd/jenkins-sonarqube-docker/`](ci-cd/jenkins-sonarqube-docker) | Jenkins pipeline: test, SonarQube scan, Docker build, push to Docker Hub | Jenkins, SonarQube, Docker, Jest |
| [`samples/go-service-k8s/`](samples/go-service-k8s) | Go HTTP service with tests, multi-stage image on `scratch`, Kubernetes manifests | Go, Docker, Kubernetes, GitHub Actions |
| [`samples/node-ts-express-ec2/`](samples/node-ts-express-ec2) | TypeScript Express app with tests, plus a manual GitHub Actions deploy to EC2 with PM2 | Node.js, TypeScript, Jest, GitHub Actions, AWS EC2 |
| [`samples/django-app/`](samples/django-app) | Small Django app with model, views and tests | Python, Django |
| [`samples/node-jwt-auth-api/`](samples/node-jwt-auth-api) | Auth API with JWT access/refresh tokens and role-based access | Node.js, TypeScript, Express, MongoDB |
| [`scripts/`](scripts) | Bash install scripts and step-by-step setup guides for Docker, Jenkins, SonarQube, Nginx, PM2, AWS CLI | Bash, Ubuntu |
| [`cheatsheets/`](cheatsheets) | Linux command notes | awk, ssh, disk resize, and more |

## CI in this repo

Workflows live in [`.github/workflows`](.github/workflows) and only run for the folder that changed.

| Workflow | Trigger | Steps |
|---|---|---|
| `go-ci.yml` | push / PR touching the Go sample | vet, test with coverage, Docker build |
| `node-ci.yml` | push / PR touching either Node project | install, test, build (matrix of two projects) |
| `django-ci.yml` | push / PR touching the Django sample | install, test |
| `deploy-node-ec2.yml` | manual | build, upload artifact, SCP to EC2, restart with PM2 |

The deploy workflow is manual because it needs an EC2 host and secrets (`EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`).

## Running things

Every folder explains how to run it. Quick examples:

```bash
# Go service
cd samples/go-service-k8s && go test ./... && go run .

# Docker multi-stage build
cd docker/project-3-multi-stage && docker build -t node-multistage . && docker run -p 3000:3000 node-multistage
```

## About

Built by [Raghwandra Singh](https://www.linkedin.com/in/raghwandra-singh-98306814a), backend engineer working with Node.js, TypeScript, AWS, Terraform and Kubernetes.
