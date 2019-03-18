FROM keymetrics/pm2:6-jessie as builder
WORKDIR /webapp/
COPY package.json .
RUN npm install --production --registry=https://registry.npm.taobao.org

FROM keymetrics/pm2:6-jessie
LABEL version="1.0"
LABEL maintainer="Arthur <shouxing.sun@aliyun.com>"
WORKDIR /webapp/
COPY --from=builder /webapp/node_modules/ ./node_modules/
CMD [ "pm2", "status" ]
