ng build --prod
cd dist
git init
git remote add origin https://github.com/samuelmartineau/merry-crosstmas-client.git
git add .
git commit -m "Release ng2 version"
git push origin "ng2-prod"
