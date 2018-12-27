npm run build
mkdir -p /srv/static/front-end/
cp -r dist/* /srv/static/front-end/
chmod 755 -R /srv/static/front-end/
