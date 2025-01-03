# Use uma imagem base do Node.js para a fase de build
FROM node:latest AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e instale as dependências
COPY package.json package-lock.json ./
RUN npm install

# Copie os arquivos de código fonte
COPY . .

# Construa a aplicação Angular
RUN npm run build --prod

# Use uma imagem base do Nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos de build para o diretório de servidão do Nginx
COPY --from=build /app/dist/birthday-app /usr/share/nginx/html

# Exponha a porta que a aplicação usa
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
