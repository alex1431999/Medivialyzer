# Base image
FROM node:18-alpine

# Set workdir inside container
WORKDIR /app

# Copy source code
COPY . .

# Enable Corepack (comes with Node 18+)
RUN corepack enable && corepack prepare yarn@4 --activate

# Install dependencies
RUN yarn install

# Expose the port the app runs on
EXPOSE 3000
