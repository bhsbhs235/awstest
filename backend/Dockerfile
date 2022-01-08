FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

copy ./ /usr/src/app

#RUN npm install -g npx
RUN npm install -g typescript
#RUN npm install -g yarn

EXPOSE 5000

# You can change this
CMD [ "npm", "start" ]