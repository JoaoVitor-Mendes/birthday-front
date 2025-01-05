# Usando uma imagem base do Node.js
FROM node:latest

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de dependência (package.json e package-lock.json)
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Rodar o build da aplicação Angular
RUN npm run build:prod

# Stage 2: Serve the Angular application using Nginx
FROM nginx:latest
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]