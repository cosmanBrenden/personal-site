#!/bin/bash

python3 -m waitress --host=0.0.0.0 --port=8080 api:app