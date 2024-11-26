# Stage 1: Build Angular application
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the application for production
RUN npm run build --prod

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy Angular build artifacts from builder stage to NGINX HTML directory
COPY --from=builder /app/dist/fitness-tracker-web/browser /usr/share/nginx/html

#Give the nginx conf file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the HTTP port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
