# Use a lightweight Node.js image
FROM node:alpine

# Add metadata
LABEL version="1.0"
LABEL description="CodeNest - Collaborative Code Editor"
LABEL maintainer="apabishekraj@gmail.com"

# Set the working directory inside the container
WORKDIR /app

# Copy only the package files first to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Set environment variables
ENV REACT_APP_BACKEND_URL=http://localhost:5000
ENV SERVER_PORT=5000

# Expose the required ports
EXPOSE 5000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:docker"]
