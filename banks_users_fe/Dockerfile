FROM node:18.17.0

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY . /app/
RUN npm run build

CMD ["npm", "start"]
