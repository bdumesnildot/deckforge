# Dockerfile for app

#######################
# Install stage
#######################
FROM node:lts-alpine3.17 AS installer
RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app
COPY . .
RUN npm install

#######################
# Build stage
#######################
FROM installer AS build
RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app
ARG VITE_HS_API_KEY
ENV VITE_HS_API_KEY $VITE_HS_API_KEY
RUN npm run build

#######################
# Server stage
#######################
FROM nginx:stable-alpine3.17 AS server
EXPOSE 80
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
