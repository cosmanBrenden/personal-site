#!/bin/bash

authbind python3 -m gunicorn -b 0.0.0.0:5000 api:app
