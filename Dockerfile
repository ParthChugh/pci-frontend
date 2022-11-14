# Install dependencies only when needed
FROM node:lts-alpine AS deps

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json yarn.lock /usr/src/app
RUN yarn install --frozen-lockfile


FROM node:lts-alpine AS builder

ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=4096"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
COPY --from=deps /usr/src/app/node_modules /usr/src/app/node_modules
RUN ls
RUN yarn build


FROM node:lts-alpine AS runner

ARG X_TAG
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/next-i18next.config.js /usr/src/app/
COPY --from=builder /usr/src/app/next.config.js /usr/src/app/
COPY --from=builder /usr/src/app/public /usr/src/app/public
COPY --from=builder /usr/src/app/.next /usr/src/app/.next
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
CMD ["node_modules/.bin/next", "start", "-p", "3000"]