FROM node:14-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./

EXPOSE 3001

FROM base as production
ENV NODE_ENV=production
RUN npm ci
RUN npm build
COPY ./dist ./
CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY ./ ./
CMD ["npm", "start"]