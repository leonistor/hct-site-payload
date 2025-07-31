#!/bin/bash

PROJECT="hct"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M")
NAME="$PROJECT-backup-$TIMESTAMP"

echo "Backup archive (public, db) at: build/$NAME.tar.gz"

mkdir -p build
tar -czf "build/$NAME.tar.gz" public db

echo "Done"
