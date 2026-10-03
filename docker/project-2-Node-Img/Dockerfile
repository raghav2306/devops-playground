FROM node:22

WORKDIR /app

COPY package.json ./

# Copy source code
COPY src ./src

# Install app dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3000

CMD ["node", "src/index.js"]