/**
 * seed cu produse selectate de Leo, desc tradusa cu AI
 */

import { existsSync } from 'fs'
import { confirm } from '@topcli/prompts'
import type { Imgprod, Parteneri } from '@/payload-types'
import type { SanitizedConfig } from 'payload'
import payload from 'payload'

import imp_parteneri from 'import_data/partners.json'
import imp_categorii from 'import_data/categorii.json'
import imp_materiale from 'import_data/materiale.json'
import imp_produse from 'import_data/prods_leo.json'

const BASE = 'import_data/'
const PLACEHOLDER = `${BASE}image_placeholder.png`

/** main script */
export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  const created_partneri = new Map<string, Parteneri>()
  let result: Promise<void>[]
  let ok: boolean

  // admin user
  ok = await confirm('Create admin user?')
  if (ok) {
    try {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@test.com',
          password: 'test1234',
        },
      })
      payload.logger.info(`created user`)
    } catch (error) {
      payload.logger.error(`user already exists?: ${error}`)
    }
  }

  // categorii
  ok = await confirm('Create Categorii?')
  if (ok) {
    result = imp_categorii.map(async (c) => {
      await payload.create({
        collection: 'categorii',
        data: {
          denumire: c.denumire,
          icon: c.icon,
          _order: c._order,
          import_parteneri: c.import_parteneri,
        },
      })
    })
    await Promise.all(result)
    payload.logger.info('done: Categorii')
  }

  // materiale
  ok = await confirm('Create Materiale?')
  if (ok) {
    result = imp_materiale.map(async (c) => {
      await payload.create({
        collection: 'materiale',
        data: {
          denumire: c.denumire,
          denumire_en: c.denumire_en,
          descriere: c.descriere,
          _order: c._order,
          icon: c.icon,
        },
      })
    })
    await Promise.all(result)
    payload.logger.info('done: Materiale')
  }

  // parteneri
  ok = await confirm('Create parteneri?')
  if (ok) {
    result = imp_parteneri.map(async (p) => {
      const { id, name, url } = p

      // logo partener
      let imageFilePath = `${BASE}partner_logos/logo_${id}.png`
      if (!existsSync(imageFilePath)) {
        imageFilePath = PLACEHOLDER
      }
      const { id: uploadedImage } = await payload.create({
        collection: 'media',
        data: { alt: `Logo ${name}` },
        filePath: imageFilePath,
      })
      // partener
      const created = await payload.create({
        collection: 'parteneri',
        data: {
          cod: id,
          nume: name,
          logo: uploadedImage,
          url: url,
        },
      })
      // lookup for produs
      created_partneri.set(id, created)
      payload.logger.info(`created partner: ${id}`)
    })
    await Promise.all(result)
    payload.logger.info('done: Parteneri')
  }

  // --- produse
  ok = await confirm(`Create produse from 'import_data/prods_leo.json'?`)
  if (ok) {
    result = imp_produse.map(async (p) => {
      // produs
      const { partner, name, url, name_ro, name_en, content_ro, content_en, imgs } = p
      const created_imgprods: Imgprod[] = []

      // upload images
      const imgprods_result = imgs.map(async (img) => {
        const imageFilePath = `${BASE}${img}`
        const uploadedImage = await payload.create({
          collection: 'imgprod',
          data: {
            alt: `${partner} ${name}`,
          },
          filePath: imageFilePath,
        })
        created_imgprods.push(uploadedImage)
      })
      await Promise.all(imgprods_result)

      // get partener from code
      const partener = created_partneri.get(partner)

      // create produs

      // extract first sentence from content_ro descriere
      const first_sentence = content_ro.split('\n').slice(0, 3)[2]

      const created_produs = await payload.create({
        collection: 'produse',
        draft: true,
        data: {
          nume: name_ro,
          nume_en: name_en,
          descriere: first_sentence,
          descriere_md: content_ro,
          _status: 'draft',
          partener: partener,
          default_img: created_imgprods[0],
          imagini: created_imgprods,
          url_producator: url,
          descriere_en: content_en,
        },
      })
      payload.logger.info(`created produs: ${created_produs.id}`)
    })
    await Promise.all(result)
    payload.logger.info('done: Produse')
  }

  payload.logger.info('Successfully seeded!')
}
