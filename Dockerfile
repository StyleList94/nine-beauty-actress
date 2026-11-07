# Build stage
# Storybook emits static files; build once natively for both runtime platforms.
FROM --platform=$BUILDPLATFORM node:24-alpine AS builder

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@12.18.0 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build Storybook
RUN pnpm build-storybook

# Production stage
FROM nginx:alpine-slim

# Copy built Storybook to nginx
COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
