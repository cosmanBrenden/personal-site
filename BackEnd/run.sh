#!/bin/bash

python3 -m gunicorn --certfile cert.pem --keyfile key.pem -b 0.0.0.0:8080 api:app