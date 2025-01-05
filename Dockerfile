# Use uma imagem base com Node.js para construir a aplicação
FROM node:14 AS build

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código-fonte para o diretório de trabalho
COPY . .

# Execute o build da aplicação Angular em modo de produção
RUN npm run build:prod

# Use uma imagem base do Nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos de build da aplicação para o diretório padrão de Nginx
COPY --from=build /app/dist/birthday-app /usr/share/nginx/html

# Exponha a porta 80 para acessar a aplicação
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
