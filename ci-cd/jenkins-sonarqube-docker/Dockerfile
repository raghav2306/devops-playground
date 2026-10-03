# Stage 1: Build TypeScript
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package*.json ./
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["node", "build/index.js"]
