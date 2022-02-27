FROM nginx:1.21-alpine

ENV PORT=80

COPY build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf.template
CMD envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx