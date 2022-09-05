#!/bin/bash

sudo npm install -g pm2
sudo pm2 startup
sudo npm install
pm2 start lw-proxy.js -i 4
pm2 save

echo "Proxy installed"