FROM node:18.17.0

WORKDIR /app/frontend/

COPY package.json package-lock.json /app/frontend/
RUN npm install

COPY . /app/frontend/

RUN npm run build

CMD ["npm", "start"]
