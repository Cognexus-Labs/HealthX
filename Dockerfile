# Use an official Node.js image as the base
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

ARG CONVEX_DEPLOY_KEY 

# Set environment variables (Make sure to set your actual CONVEX_DEPLOY_KEY here)
ENV CONVEX_DEPLOY_KEY=prod:brazen-mastiff-548|01e819430a632d634fe9d5baccde5ff3b54916d10292e5a1921535c5a1786e4b4b93454c29ba266264cf609c81c562d7443c50

# Build the React application
RUN npm run build

# Install the convex CLI globally
RUN npm install -g convex

# Set the command to deploy the Convex backend
CMD ["sh", "-c", "yarn convex deploy --cmd 'npm run build'"]

# Expose the port the app runs on
EXPOSE 3000

# Start the development server for Convex (to be adjusted based on your needs)
# CMD ["sh", "-c", "yarn convex dev"]