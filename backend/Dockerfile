FROM node:18-alpine

# Install pnpm using npm
RUN npm install -g pnpm@8.15.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"] 