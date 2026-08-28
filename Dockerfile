FROM node:20-alpine AS base

FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache openssl

# 1. Copy full node_modules FIRST (for prisma CLI, ts-node, seed deps)
COPY --from=builder /app/node_modules ./node_modules

# 2. Copy standalone output ON TOP (its node_modules overwrites/merges correctly)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# 3. Copy prisma schema, seed script, and source data for seeding
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/data ./src/data
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV PORT=3000

CMD ["sh", "-c", "npx prisma db push --accept-data-loss 2>&1 && npx prisma db seed 2>&1; echo 'Starting server...'; node server.js"]
