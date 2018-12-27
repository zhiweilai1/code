npm run build
mkdir -p /srv/static/Official-website/
cp -r dist/* /srv/static/Official-website/ 
chmod 755 -R /srv/static/Official-website/
