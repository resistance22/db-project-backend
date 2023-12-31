FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN ["npm", "install", "-g" , "npm"]

RUN ["npm", "install"]

COPY . .

RUN ["npm","run","build"]

EXPOSE 4000

CMD ["npm", "run", "dev"]