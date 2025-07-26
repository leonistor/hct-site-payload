#!/bin/bash

if [ $# -eq 0 ]; then
    echo "ERROR: missing argument: tar.gz content archive"
    exit 1
fi

BASE="./build/standalone/"

echo "extracting archive"
mkdir -p build
tar -C ./build -xzf "$1"
if [ ! -d "$BASE" ]; then
    echo "errors extracting archive. exiting."
    exit 1
fi

echo "copying content files"
cp "$BASE".env .
cp -r "$BASE"public .
cp -r "$BASE"db .

echo "running build"
bun install
bun run build

echo "copying build files to standalone"
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
cp -r db .next/standalone/

echo "now run 'node .next/standalone/server.js'"
