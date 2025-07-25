# deploy this

## nextjs standalone

```
bun run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
cp -r db .next/standalone/
node .next/standalone/server.js
```

[!] does mot work with bun

## util

- https://payload-releases-filter.vercel.app/
- hah! get title: `curl --silent 'https://mailpit.axllent.org/docs/' | xmllint -html -xpath '//head/title/text()' - 2>/dev/null`

## backup sqlite

- install minio (on coca):https://min.io/docs/minio/linux/index.htmllogo.width
- install litestream: https://litestream.io/install/debian/
- configure and run:https://litestream.io/guides/systemd/, see https://litestream.io/getting-started/ for MinIO

**achtung!**: ARM pe hetzner

see also:

- https://blog.pecar.me/sqlite-prod#6-gotcha-backups
- https://oldmoe.blog/2024/04/30/backup-strategies-for-sqlite-in-production/
