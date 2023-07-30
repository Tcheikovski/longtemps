### DEV ###
FROM node:18 as dev
WORKDIR /usr/src/app
# Dependencies
COPY package.json package-lock.json ./
RUN npm ci
# Source dirs
COPY src ./src
COPY test ./test
# Source files
COPY .eslintrc.js .prettierrc nest-cli.json tsconfig.json tsconfig.build.json README.md ./
# Run
CMD [ "npm", "run", "start:dev"]

### BUILD ###
FROM dev as build
# Build app
RUN npm run build

### PROD ###
FROM node:18
WORKDIR /usr/src/app
# Dependencies
COPY package.json package-lock.json ./
RUN npm ci --production
# Copy build files
COPY --from=build dist ./dist
# Run
CMD [ "node", "dist/main.js"]