# Build stage
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Set build-time environment variable for Next.js
ENV NEXT_PUBLIC_API_URL=https://pathfinder-backend-m5gjb5q4gq-uc.a.run.app
RUN npm run build

# Production stage
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port Next.js runs on
EXPOSE 3000
# Run the app
CMD ["npm", "run", "start"]
