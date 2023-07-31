### DEV ###
FROM node:18 as dev
WORKDIR /usr/src/app
# Dependencies
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages ./package
COPY apps/api ./apps/api
RUN pnpm install

# Run
CMD [ "pnpm", "--filter", "@longtemps/api", "start:dev" ]

### BUILD ###
FROM dev as build
# Build app
RUN pnpm build -w @longtemps/api

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