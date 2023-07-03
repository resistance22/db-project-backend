FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN ["npm", "install"]

COPY . .

RUN ["npm","run","build"]


ENV SERVER_PORT=4000
ENV SERVER_HOST=0.0.0.0

EXPOSE 4000

CMD ["npm", "start"]