# Payload for HCT

## TODO

### dev

- [ ] sqlite automatic backup (see [DEPLOY litestream](DEPLOY.md))
- [ ] deploy to `hct.vitrina.promo`
- [ ] custom block name pt variante produs
- [ ] use markdown from descriere field
- [ ] implement search

### content

- [ ] ca la bronneberg: cursor mouse pe carousel, CTA buttons, main nav
- [ ] coolors: make pallete, primary = sapphire (https://palettemaker.com/colors/sapphire)
- [ ] nav: mai lat, similar bronneberg
- [ ] video player (demo)
- [ ] testimonials --> de pe site (h-ct) (Referinte)
- [ ] videos -> descarca din src de la https://h-ct.ro/galerie-video.php
      prima si ultimele doua
- [ ] map in contact

<!-- [Google Maps](https://www.google.com/maps/place/Hategan+Consulting+%26+Trading/@45.6506453,25.6351587,17z/ data=!3m2!4b1!5s0x40b35c68f7de544d:0xd6dbf371333260f7!4m6!3m5!1s0x40b35da40b5d0083:0x81d1bea36d74abd2!8m2!3d45.6506416!4d25.637733 6!16s%2Fg%2F11k8l98ch6?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D) -->

### Nice-to-have

- [ ] display collection count in admin dashboard: see `payload-theme-quantum-leap`
- [ ] icon picker (see plugins)
- keep versions and show in admin/site
- [ ] generate changelog using [changie](https://changie.dev/)

---

<p style="text-align:center">~</p>

---

## bump payload

Manual:

- search current version (`3.48`) in `package.json`
- check payload packages `@payload...`
- replace with new version (`3.49.1`)
- `bun install`
- run tests: `bun run test:e2e`

## components

see [COMPONENTS.md](docs/COMPONENTS.md)

## packages

- Node.js user prompt library for command-line interfaces.: https://github.com/TopCli/prompts
- es-toolkit: https://es-toolkit.dev/usage.html
- Falso Fake Data for All Your Real Needs: https://ngneat.github.io/falso/docs/getting-started

## maybe payload plugins

- bump versions: https://github.com/r1tsuu/payload-enchants/tree/master/packages/bump-payload
- icon picker 1: https://github.com/shefing/payload-tools/tree/main/packages/icon-select
- icon picker 2: https://github.com/innovixx/payload-icon-picker-field
- adaptive videos: https://github.com/cgilly2fast/plugin-adaptive-bitrate-videos
- switch env: https://github.com/elliott-w/payload-plugin-switch-env

## tools

- emoji picker: https://www.freetool.dev/emoji-picker/
- GitHub - cloudfour/simple-svg-placeholder: A very simple placeholder image generator with zero dependencies.: https://github.com/cloudfour/simple-svg-placeholder
- favicon: https://realfavicongenerator.net/

## articles

see [DEPLOY.md](docs/DEPLOY.md).

- Running Next.js with Docker: https://markus.oberlehner.net/blog/running-nextjs-with-docker
- Deploying a Next.js app to production using Docker: https://codeparrot.ai/blogs/deploy-nextjs-app-with-docker-complete-guide-for-2025
