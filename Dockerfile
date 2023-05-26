FROM node:16.20.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PATH ./node_modules/.bin:$PATH

ENV NODE_ENV=.env

RUN npm run build

CMD ["npm", "run", "start:prod"]