FROM node:10-alpine

WORKDIR /app

COPY . .

RUN yarn

CMD ["yarn", "start"]
