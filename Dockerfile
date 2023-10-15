# Stage 1: Base Image
FROM node:20-slim AS base
ENV NODE_ENV=production
WORKDIR /app

# Stage 2: Development Dependencies
FROM base AS dev-deps
# Install development dependencies using npm
COPY package.json package-lock.json ./
RUN npm install

# Stage 3: Testing
FROM dev-deps AS test
# Copy the project source code
COPY ./ ./
# Run tests using npm
CMD [ "npm", "run", "test" ]

# Stage 4: Production Dependencies
FROM base AS prod-deps
# Install production dependencies using npm
COPY package.json package-lock.json ./
RUN npm install --only=production

# Stage 5: Production
FROM prod-deps
# Copy the project source code
COPY src/ src/
# Start the application in production mode
CMD [ "node", "src/index.js" ]
