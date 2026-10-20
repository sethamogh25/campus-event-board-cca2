FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY server.js index.html ./
COPY tests ./tests
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
USER node
ARG APP_VERSION=1
ENV APP_VERSION=$APP_VERSION
CMD ["node", "server.js"]
