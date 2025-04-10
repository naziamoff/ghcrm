FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/build /usr/share/frontend

RUN npm install -g serve

CMD ["serve", "-s", "/usr/share/frontend", "-l", "3000"]
