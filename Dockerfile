FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY /src/ ./src/

RUN yarn install && yarn build

EXPOSE 80

CMD ["node", "dist/server.js"]
