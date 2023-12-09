# Dockerfile for React client

# Build react client
FROM --platform=linux/amd64 node:alpine

# Working directory is /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy local files to app folder
COPY . .

# Installing dependencies
RUN apk -U upgrade && \
    npm install --force

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
