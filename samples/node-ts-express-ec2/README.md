# Node.js + TypeScript Express app

Minimal Express app in TypeScript with Jest and Supertest tests, built to practice CI and deployment to EC2.

## Run

```bash
npm ci
npm run dev        # nodemon
npm test
npm run build      # outputs to build/
npm start          # node build/src/index.js
```

## Deployment

`.github/workflows/deploy-node-ec2.yml` (repo root) builds a release tarball, copies it to an EC2 instance over SSH and restarts the app with PM2. It is manual (`workflow_dispatch`) and needs the secrets `EC2_HOST`, `EC2_USER` and `EC2_SSH_KEY`.

To prepare a fresh Ubuntu server for this app (Nginx, Node.js, PM2), use `scripts/install/setup-node-nginx-pm2.sh`.
