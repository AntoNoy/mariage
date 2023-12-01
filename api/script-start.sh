#!/bin/bash

# npm run stop:prod || true
# npm run start:prod

/var/services/homes/***/.npm-packages/lib/node_modules/pm2/bin/pm2 delete api-mariage
/var/services/homes/***/.npm-packages/lib/node_modules/pm2/bin/pm2 start dist/main.js --name api-mariage
/var/services/homes/***/.npm-packages/lib/node_modules/pm2/bin/pm2 save
