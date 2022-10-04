FROM node:16.14.0 as vue-build

RUN mkdir -p /mymavin
WORKDIR /mymavin

COPY . .
RUN npm ci && npm cache clean --force
RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]
