# ---- Base image ----
FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ---- Build both apps ----
FROM base AS build
WORKDIR /repo
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run --filter=cially-web build

RUN pnpm deploy --filter=cially-bot --prod /prod/cially-bot
RUN pnpm deploy --filter=cially-web --prod /prod/cially-web

# ---- cially-bot image ----
FROM base AS cially-bot
WORKDIR /app
RUN addgroup --system cially && adduser --system --ingroup cially cially
COPY --from=build /prod/cially-bot .
USER cially
EXPOSE 3001
ENV NODE_ENV=production
ENV PORT=3001
CMD ["node", "index.js"]

# ---- cially-web image ----
FROM base AS cially-web
WORKDIR /app
RUN addgroup --system cially && adduser --system --ingroup cially cially
COPY --from=build /prod/cially-web .
USER cially
EXPOSE 3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
