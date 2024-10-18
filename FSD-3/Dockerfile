FROM node:alpine

LABEL maintainer="Deloitee"

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY index.js ./

# Command to run the application
CMD ["node", "index.js"]
