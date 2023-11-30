#!/bin/bash

# npm run stop:prod || true
# npm run start:prod

/var/services/homes/***/.npm-packages/lib/node_modules/pm2/bin/pm2 stop api-mariage
/var/services/homes/***/.npm-packages/lib/node_modules/pm2/bin/pm2 start api-mariage
