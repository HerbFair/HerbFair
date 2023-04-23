FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY ./ ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package.json ./
COPY --from=builder /app/build .
EXPOSE 3000
RUN npm i -g serve
CMD ["serve","-s","build"]