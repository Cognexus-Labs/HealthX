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
ARG VITE_CONVEX_URL

# Set environment variables (Make sure to set your actual CONVEX_DEPLOY_KEY here)
ENV CONVEX_DEPLOY_KEY=prod:brazen-mastiff-548|01e819430a632d634fe9d5baccde5ff3b54916d10292e5a1921535c5a1786e4b4b93454c29ba266264cf609c81c562d7443c50
ENV VITE_CONVEX_URL=https://brazen-mastiff-548.convex.cloud
# Build the React application
RUN npm run build

# Install the convex CLI globally
RUN npm install -g convex

# Expose the port the app runs on
EXPOSE 3000

# Install serve to serve the build directory
RUN npm install -g serve

# Command to deploy the Convex backend and start the static server
CMD ["sh", "-c", "yarn convex deploy && serve -s dist", "0.0.0.0:3000"]
