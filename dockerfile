
FROM node:12-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

# Install dependencies
RUN npm install

# Copy local code to the container image.
COPY . ./


# Run the web service on container startup.
CMD [ "npm", "run", "start" ]