#!/bin/sh

# replace static values with environment variables
if [ -n "${ANGULAR_PROFILE_ACTIVE}" ]; then
  sed -i "s/_PROFILE_ACTIVE_/$ANGULAR_PROFILE_ACTIVE/g" /usr/share/nginx/html/main*.js
fi

nginx -g 'daemon off;'
