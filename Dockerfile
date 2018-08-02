FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY dist/decora-browser-lib-ui/ .

COPY nginx.sh /usr/share/nginx/start.sh
RUN chmod +x /usr/share/nginx/start.sh

CMD [ "/usr/share/nginx/start.sh"]
