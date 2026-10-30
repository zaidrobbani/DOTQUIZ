# ---------- 1. deps: install dependency pakai Bun ----------
FROM oven/bun:1.4.2-slim AS deps
WORKDIR /app
COPY package.json bun.lock ./
# --ignore-scripts: lewati "prepare: lefthook install" (tidak ada .git di dalam image)
RUN bun install --frozen-lockfile --ignore-scripts

# ---------- 2. builder: build Next.js pakai Node ----------
FROM node:22-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node node_modules/next/dist/bin/next build

# ---------- 3. runner: image akhir yang ringan ----------
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]