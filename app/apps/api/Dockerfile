############
### BASE ###
############
FROM node:18.14.0-slim as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN corepack prepare pnpm@8.6.12 --activate

COPY . /usr/src/app
WORKDIR /usr/src/app

###########
### DEV ###
###########
FROM base as dev
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
CMD [ "pnpm", "--filter", "@longtemps/api", "start:dev" ]

#############
### BUILD ###
#############
FROM dev as build
RUN pnpm --filter @longtemps/api build

############
### PROD ###
############
FROM base
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
COPY --from=build /usr/src/app/apps/api/dist /usr/src/app/apps/api/dist
# Run
CMD [ "node", "dist/main.js"]
