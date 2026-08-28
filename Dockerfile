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

# Copy standalone Next.js output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy prisma schema, seed, and source data needed by seed
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/data ./src/data
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/package.json ./package.json

# Copy full node_modules for prisma CLI, ts-node, and seed execution
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
ENV PORT=3000

CMD ["sh", "-c", "npx prisma db push --accept-data-loss 2>&1 && npx prisma db seed 2>&1; echo 'Starting Next.js server...'; node server.js"]
