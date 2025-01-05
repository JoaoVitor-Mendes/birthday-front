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

# Usar uma imagem base do Nginx para servir a aplicação
FROM nginx:alpine

# Copiar o build gerado para o diretório do Nginx
COPY --from=0 /app/dist/birthday-app /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
