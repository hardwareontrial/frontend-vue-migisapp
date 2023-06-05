FROM node:16.17-bullseye-slim as build-stage

ENV VUE_APP_TITLE="MIG-IS | Staging Ver."
ENV VUE_APP_API_ENDPOINT=192.168.100.227:8110

RUN mkdir -p /home/node/frontend/node_modules
WORKDIR /home/node/frontend/
COPY ./ ./
COPY ./.env.example ./.env
RUN npm install
RUN npm run build

FROM nginx:stable-bullseye
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /home/node/frontend/dist /usr/share/nginx/html

EXPOSE 80

COPY ./entrypoint.sh /usr/bin/frontend-entrypoint.sh
RUN chmod +x /usr/bin/frontend-entrypoint.sh
ENTRYPOINT ["frontend-entrypoint.sh"]