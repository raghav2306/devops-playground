FROM ubuntu:latest

WORKDIR /app

COPY package.json ./

# Copy source code
COPY src ./src

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs

# Install app dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3000

CMD ["node", "src/index.js"]