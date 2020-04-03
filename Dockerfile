FROM node:10-alpine

ENV app=/app

WORKDIR ${app}

COPY . .${app}

RUN yarn

CMD ["yarn", "start"]
