#!/bin/bash

PROJECT="hct"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M")
NAME="$PROJECT-data-$TIMESTAMP"

mkdir -p build
# tar -C .next -czf "build/$NAME.tar.gz" standalone/
tar -czf "build/$NAME.tar.gz" public db

echo "Done archive at: build/$NAME.tar.gz"
