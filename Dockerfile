FROM node:20 AS builder
Workdir /app
copy package*.json ./
RUN npm install
COPY . . 
EXPOSE 3000
CMD ["npm" ,"run","start"]
