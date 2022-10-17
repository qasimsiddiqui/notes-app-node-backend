FROM node:16.18.0

RUN mkdir -p /home/app

COPY . /home/app

WORKDIR /home/app

RUN npm install

RUN npm run build

CMD [ "node", "dist/app.js" ]

EXPOSE 4000