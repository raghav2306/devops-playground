# Stage 1: Build stage
FROM node:22 AS builder

WORKDIR /app

COPY package.json ./

# Install app dependencies
RUN npm install

# Copy source code
COPY src ./src

# Stage 2: Final distroless stage
FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app

COPY --from=builder /app .

# Expose the port your app runs on
EXPOSE 3000

CMD ["src/index.js"]