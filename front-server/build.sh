npm run build
mkdir -p /srv/static/front-server/
cp -r dist/* /srv/static/front-server/
chmod 755 -R /srv/static/front-server/
