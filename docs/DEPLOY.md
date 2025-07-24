# deploy this

## nextjs standalone

```
bun run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
cp backend.db .next/standalone/
node .next/standalone/server.js
```

[!] does mot work with bun

## util

- https://payload-releases-filter.vercel.app/
