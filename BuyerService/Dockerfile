FROM node:18-alpine

RUN npm install --global pnpm

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml ./

RUN pnpm fetch --prod

ADD . ./
RUN pnpm install --prod

EXPOSE 8080
CMD [ "node", "index.js" ]
