FROM node:19-alpine3.17 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# then create a new docker image with the build files (node)
FROM node:19-alpine3.17

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --omit=dev
COPY --from=build /app/build ./build

CMD ["npm", "run", "start"]
EXPOSE 3000