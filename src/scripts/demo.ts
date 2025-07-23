import type { SanitizedConfig } from 'payload'
import payload from 'payload'

import { randomInt, sampleSize } from 'es-toolkit'
import { randProductDescription, randProductName } from '@ngneat/falso'

const BASE = 'import_data/demo/'
const IMAGE_COUNT = 42
// const OFERTA_SIZE = 6

import demo_prods from 'import_data/demo/demo.prods.json'
import imp_materiale from 'import_data/materiale.json'
import { Imgprod } from '@/payload-types'

/** main script */
export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  // user
  payload.logger.info('demo admin user')
  try {
    const demo_user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@test.com',
        password: 'test1234',
      },
    })
    payload.logger.info(`created user ${demo_user.id}`)
  } catch (error) {
    payload.logger.error(`user already exists?: ${error}`)
  }

  payload.logger.info('demo content')
  const demo_categorie = await payload.create({
    collection: 'categorii',
    data: {
      denumire: 'Demo categorie',
      icon: 'star',
      descriere:
        'Categorie demo cu produse inventate de Claude.ai si imagini gratuite de pe unsplash.com',
    },
  })
  payload.logger.info(`created categorie ${demo_categorie.id}`)

  // materiale
  const demo_materiale = imp_materiale.map(async (c) => {
    await payload.create({
      collection: 'materiale',
      data: {
        denumire: c.denumire,
        denumire_en: c.denumire_en,
        icon: c.icon,
      },
    })
  })
  await Promise.all(demo_materiale)
  payload.logger.info('done: Materiale')

  // partener demo
  const demo_logo = await payload.create({
    collection: 'media',
    data: {
      alt: 'logo demo partener',
      filename: 'logo_demo.png',
    },
    filePath: `${BASE}logo_demo.png`,
  })
  const demo_partener = await payload.create({
    collection: 'parteneri',
    data: {
      cod: 'demo',
      nume: 'Demo Partener',
      descriere: 'Demo partener pentru continut site',
      logo: demo_logo,
    },
  })
  payload.logger.info(`created partener ${demo_partener.id}`)

  // imagini produse
  const demo_imagini_produse: Imgprod[] = []
  for (let index = 1; index <= IMAGE_COUNT; index++) {
    const padded_index = index < 10 ? `0${index}` : index.toString()
    const demo_imgprod = await payload.create({
      collection: 'imgprod',
      data: {
        alt: `demo`,
        filename: `demo-${padded_index}.jpg`,
      },
      filePath: `${BASE}demo-${padded_index}.jpg`,
    })
    demo_imagini_produse.push(demo_imgprod)
    payload.logger.info(`created image ${padded_index}`)
  }
  payload.logger.info(`created ${demo_imagini_produse.length} imagini produse`)

  const materiale = await payload.find({
    collection: 'materiale',
    pagination: false,
  })

  // demo produse
  const result = demo_prods.map(async (p) => {
    const sample_materiale = sampleSize(materiale.docs, randomInt(1, 4))
    const imagini_prod = demo_imagini_produse.splice(0, p.img_count)
    const _demo_prod = await payload
      .create({
        collection: 'produse',
        draft: false,
        data: {
          _status: 'published',
          nume: p.name,
          promo: Boolean(p.promo),
          descriere: randProductDescription(),
          partener: demo_partener,
          categorie: demo_categorie,
          materiale: sample_materiale,
          imagini: imagini_prod,
          import_cod_partener: 'demo',
        },
      })
      .catch((error) => {
        payload.logger.error(`${JSON.stringify(error)}`)
      })
  })
  await Promise.all(result)
  payload.logger.info(`created ${demo_prods.length} produse draft=false`)

  // unpublished
  for (let index = 0; index < 10; index++) {
    await payload
      .create({
        collection: 'produse',
        draft: true,
        data: {
          nume: randProductName(),
          promo: false,
          descriere: randProductDescription(),
          partener: demo_partener,
          categorie: demo_categorie,
          imagini: [demo_imagini_produse[32 + index]],
          import_cod_partener: 'demo',
        },
      })
      .catch((error) => {
        payload.logger.error(`${JSON.stringify(error)}`)
      })
  }
  payload.logger.info(`created 10 produse draft=true`)

  payload.logger.info('✅ Done!')
}

/*
  payload.logger.info(`oferta=true pentru random ${SIZE} products`)
  const all_ids = (
    await payload.find({
      collection: 'produse',
      pagination: false,
    })
  ).docs.map((p) => p.id) as number[]

  const ids = sampleSize(all_ids, SIZE)
  console.log(`selected ids: ${ids}`)

  const result_oferta = await payload.update({
    collection: 'produse',
    where: {
      id: { in: ids },
    },
    data: {
      promo: true,
    },
  })
  console.log('errors: ', result_oferta.errors)
*/
