FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source
RUN npm run build

ENV PORT=4000

EXPOSE $PORT

CMD ["npm", "run", "start"]
