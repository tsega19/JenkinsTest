FROM node:14 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

RUN ls -l /app/dist

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



# docker build -t invictus-pgw-merchant-fe-master .
# docker run -p 8080:80 invictus-pgw-merchant-fe-master
