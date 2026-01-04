#!/bin/bash

python3 -m gunicorn --certfile cert.pem --keyfile key.pem -b 0.0.0.0:443 api:app
