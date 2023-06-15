# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port on which the Next.js app will run (default is 3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]