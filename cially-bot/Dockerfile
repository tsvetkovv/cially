FROM node:22-alpine as base


FROM base as deps
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


FROM base as runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 bot

COPY --from=deps --chown=bot:nodejs /app/node_modules ./node_modules
COPY --chown=bot:nodejs . .

USER bot

EXPOSE 3001

ENV PORT=3001

CMD ["node", "index.js"]
