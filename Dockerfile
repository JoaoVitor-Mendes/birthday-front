FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:prod

FROM nginx:alpine
COPY --from=builder /app/dist/birthday-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]