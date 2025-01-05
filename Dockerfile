# Use uma imagem base do Nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos de build da aplicação para o diretório padrão de Nginx
COPY --from=build /app/dist/birthday-app /usr/share/nginx/html

# Copie a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponha a porta 80 para acessar a aplicação
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
