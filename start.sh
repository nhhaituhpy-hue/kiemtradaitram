#!/bin/bash
echo "Running Prisma migrations and seed..."
npx prisma db push --accept-data-loss
npx prisma db seed

echo "Starting Next.js..."
node server.js
