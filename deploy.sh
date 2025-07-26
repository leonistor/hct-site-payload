#!/bin/bash

PROJECT="hct"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M")

# copy files and sqlite db
# cp -r public .next/standalone/
# #!!! ???
# cp -r .next/static .next/standalone/.next/
# cp -r db .next/standalone/
# echo "Copied files and sqlite db to .next/standalone"

NAME="$PROJECT-data-$TIMESTAMP"

mkdir -p build
# tar -C .next -czf "build/$NAME.tar.gz" standalone/
tar -czf "build/$NAME.tar.gz" public db

echo "Done archive at: build/$NAME.tar.gz"
