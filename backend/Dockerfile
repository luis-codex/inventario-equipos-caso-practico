# Imagen ligera de Node sobre Alpine Linux
FROM node:22-alpine

WORKDIR /app

# Copiar solo los manifiestos primero para aprovechar la cache de capas de Docker
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar el resto del codigo fuente del backend
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
