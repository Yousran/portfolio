# Gunakan image Node.js sebagai base image
FROM node:23.4-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Salin semua file ke working directory
COPY . .

# Jalankan migrasi
RUN npx sequelize-cli db:migrate

# Jalankan seed
# RUN npx sequelize-cli db:seed:all

# Build aplikasi Next.js
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]