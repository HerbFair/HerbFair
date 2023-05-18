FROM node:18-alpine as builder

WORKDIR /app

COPY package.json vite.config.js ./
COPY pnpm-lock.yaml index.html ./
COPY public ./public
COPY src ./src

RUN npm install -g pnpm && \
    pnpm install && \
    pnpm build


FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY --from=builder /app/dist .

EXPOSE 3000

CMD ["pnpm","preview"]