FROM node:18.14.0-slim as prod
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@8.6.12 --activate
COPY ./app /usr/src/app
WORKDIR /usr/src/app

FROM node:18.14.0 as dev
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@8.6.12 --activate
COPY ./app /usr/src/app
WORKDIR /usr/src/app

FROM prod AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod

FROM dev AS dev-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM dev-deps AS build
RUN pnpm run -r build

FROM dev-deps AS api-dev
CMD ["pnpm", "--filter", "@longtemps/api", "start:dev"]

FROM prod AS api-prod
# Core
COPY --from=prod-deps /usr/src/app/packages/core/node_modules/ /usr/src/app/packages/core/node_modules
COPY --from=build /usr/src/app/packages/core/dist /usr/src/app/packages/core/dist
# Api
COPY --from=prod-deps /usr/src/app/apps/api/node_modules/ /usr/src/app/apps/api/node_modules
COPY --from=build /usr/src/app/apps/api/dist /usr/src/app/apps/api/dist
# Start
CMD ["node", "apps/api"]
