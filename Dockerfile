# Build stage
FROM node:8

WORKDIR /usr/src

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

CMD ["yarn", "start"]
