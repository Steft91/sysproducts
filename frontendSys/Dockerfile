# Etapa 1: Compilar Angular
FROM node:20-alpine as build

WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto Angular
COPY . .

# Compilar Angular para producción
RUN npm run build --prod

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Elimina configuración default de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos compilados de Angular al contenedor Nginx
COPY --from=build /app/dist/frontendSys/browser /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (opcional si necesitas API proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
