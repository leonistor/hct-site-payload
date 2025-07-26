#!/bin/bash

PROJECT="hct"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M")
NAME="$PROJECT-data-$TIMESTAMP"

mkdir -p build
tar -czf "build/$NAME.tar.gz" public db .env

echo "Done archive at: build/$NAME.tar.gz"
echo "Now copy it to server."
