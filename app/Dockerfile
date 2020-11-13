FROM node
EXPOSE 8080
WORKDIR /home/node/app
ADD . ./
RUN npm ci --production
CMD ["npm", "start"]
