FROM node:18-slim

# Install LibreOffice and unoconv
RUN apt-get update && \
    apt-get install -y libreoffice unoconv && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY index.js ./

EXPOSE 3000

CMD ["node", "index.js"]
