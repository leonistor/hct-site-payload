# Payload for HCT

## content

- categorii gata in payload, la desc gasesti partenerii cu ele
- all products from pocketbase

## TODO

- [ ] site v0.1 (despre noi pe prima pagina) saptamana asta
- [ ] propuneri logo catre Seba pentru Ioana
- [ ] "draft" la produse
- [x] clean db script
- [x] imgprod missing placeholder with logo
- [x] use falso fake data
- [x] random materiale in produs (es-toolkit sampleSize)
- [ ] display collection count in admin dashboard: see `payload-theme-quantum-leap`
- [ ] beautify lists in admin
- [ ] i18n ro
- [ ] docker deploy (see articles below)
- [ ] mailer
- [x] versions/drafts? NEIN (https://payloadcms.com/docs/versions/overview)

## components

see [COMPONENTS.md](docs/COMPONENTS.md)

## packages

- Node.js user prompt library for command-line interfaces.: https://github.com/TopCli/prompts
- es-toolkit: https://es-toolkit.dev/usage.html
- Falso Fake Data for All Your Real Needs: https://ngneat.github.io/falso/docs/getting-started

## tools

- emoji picker: https://www.freetool.dev/emoji-picker/
- GitHub - cloudfour/simple-svg-placeholder: A very simple placeholder image generator with zero dependencies.: https://github.com/cloudfour/simple-svg-placeholder

## favicon

- https://realfavicongenerator.net/

## articles

see [DEPLOY.md](docs/DEPLOY.md).

- Running Next.js with Docker: https://markus.oberlehner.net/blog/running-nextjs-with-docker
- Deploying a Next.js app to production using Docker: https://codeparrot.ai/blogs/deploy-nextjs-app-with-docker-complete-guide-for-2025

## take from payload (examples/templates):

- move nextjs toolbar (nextjs config)

```js
devIndicators: {
    position: 'bottom-right',
  },

```

- Media collection

```js
upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
```
