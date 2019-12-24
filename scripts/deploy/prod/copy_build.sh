#!/bin/bash
scp -r build "$1":/usr/local/gitcom/frontend/app/tmp
echo "Build was copied to production!"