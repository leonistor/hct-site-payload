#!/bin/bash

PROJECT="hct"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M")

# if [ "$(uname)" != "Darwin" ]; then
#     echo "Does not work on Linux! Must change 'cp -r' to 'cp -R'! Aborting"
#     exit 1
# fi

# copy files and sqlite db
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
cp -r db .next/standalone/
echo "Copied files and sqlite db to .next/standalone"

NAME="$PROJECT-$TIMESTAMP"

mkdir -p build
tar -C .next -czf "build/$NAME.tar.gz" standalone/

echo "Done archive at: build/$NAME.tar.gz"
