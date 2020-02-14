FROM node:alpine AS builder

ARG PROD_MODE

WORKDIR /app

COPY ./package.json .
RUN npm install

COPY . .

RUN $(npm bin)/ng build $PROD_MODE

FROM nginx:alpine

COPY --from=builder /app/dist/tiberium-front /usr/share/nginx/html
COPY --from=builder /app/deployment/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
