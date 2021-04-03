### STAGE 1: Build ###
FROM node:12.7-alpine AS build
#WORKDIR /usr/src/app
#WORKDIR /src/app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
#COPY . /usr/src/app
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /usr/src/app/dist/mediscreen-v1 /usr/share/nginx/html
#COPY --from=build /src/app/dist/mediscreen-v1 /usr/share/nginx/html
COPY --from=build /app/dist/mediscreen-v1 /usr/share/nginx/html



#FROM nginx:1.17.1-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY /dist/mediscreen-v1 /usr/share/nginx/html

#From nginx:alpine
#WORKDIR /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY dist/mediscreen-v1 .
