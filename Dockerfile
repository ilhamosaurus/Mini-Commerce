# Use Node.js 20.11.0 base image
FROM node:20.11.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json, package-lock.json and Prisma schema
COPY package*.json ./
COPY /prisma ./prisma


# Install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Generate Prisma Client code
RUN npx prisma generate

# Expose the port the app runs on, here, I was using port 4003
EXPOSE 4003

# Command to run the app
CMD [  "npm", "run", "deploy:docker" ]