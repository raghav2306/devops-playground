# Stage 1: Build stage
FROM node:22 AS builder

WORKDIR /app

COPY package.json ./

# Install app dependencies
RUN npm install

# Copy source code
COPY src ./src

# Stage 2: Final lightweight image
FROM node:22-slim

WORKDIR /app

COPY --from=builder /app .

# Expose the port your app runs on
EXPOSE 3000

CMD ["node", "src/index.js"]