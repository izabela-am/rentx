FROM node:alpine

WORKDIR /home/lab/dso/devsecops-teste/app1

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .
USER node

EXPOSE 3000

CMD [ "npm", "run", "dev" ]