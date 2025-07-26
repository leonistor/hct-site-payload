#!/bin/bash

echo "run before build!"

SECRET=$(openssl rand -base64 24)

cp .env.example .next/standalone/.env
echo "PAYLOAD_SECRET=$SECRET" >>.next/standalone/.env

echo "now build works"
