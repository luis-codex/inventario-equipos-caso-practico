# --- Etapa 1: build de produccion de la app Angular ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build

# --- Etapa 2: servir el build estatico con nginx ---
FROM nginx:alpine
COPY --from=build /app/dist/inventario-equipos/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
