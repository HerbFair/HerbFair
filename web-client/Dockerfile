FROM node:18-alpine as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml  ./

RUN npm install -g pnpm && \
    pnpm install

COPY public ./public
COPY vite.config.js index.html ./
COPY src ./src

RUN pnpm build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/vite.config.js /app/package.json ./

EXPOSE 3000

CMD ["pnpm","preview"]