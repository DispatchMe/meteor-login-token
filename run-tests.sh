#!/bin/bash

PACKAGE_DIRS=./packages velocity test-package packages/simple-sso --port 5000 --release METEOR@1.2.0.1
