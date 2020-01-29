#!/bin/bash
python3 scripts/deploy/prod/stages/cdn_upload.py
./scripts/deploy/prod/stages/copy_build.sh $1
ssh $1 "bash -s" < ./scripts/deploy/prod/stages/deploy.sh