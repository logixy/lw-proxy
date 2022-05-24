#!/bin/bash

sudo npm install -g pm2
sudo npm install
pm2 start lw-proxy.js -i 4

echo "Proxy installed"