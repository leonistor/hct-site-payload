#!/bin/bash

if [ $# -eq 0 ]; then
    echo "ERROR: missing argument: tar.gz content archive"
    exit 1
fi

BASE="./build/"

echo "extracting archive"
mkdir -p build
tar -C ./build -xzf "$1" || exit 1

echo "copying content files"
cp "$BASE".env . || exit 1
cp -r "$BASE"public . || exit 1
cp -r "$BASE"db . || exit 1

echo "running build"
bun install
bun run build

echo "copying build files to standalone"
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
cp -r db .next/standalone/

echo "now run 'node .next/standalone/server.js'"
