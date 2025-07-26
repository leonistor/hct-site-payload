#!/bin/bash

echo "run only after build!"

SECRET=$(openssl rand -base64 24)

cp -r .next/static .next/standalone/.next/
cp .env.example .next/standalone/.env
echo "PAYLOAD_SECRET=$SECRET" >>.next/standalone/.env

echo "good. now extract hct-data (public/, db/) and go!"
