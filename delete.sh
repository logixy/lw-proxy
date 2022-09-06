#!/bin/bash

pm2 delete lw-proxy
pm2 unstartup systemd

echo "Proxy deleted"