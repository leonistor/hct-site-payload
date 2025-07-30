/**
 * seed cu produse selectate de Leo, desc tradusa cu AI
 */

import { existsSync } from 'fs'
import { confirm } from '@topcli/prompts'
import type { Parteneri } from '@/payload-types'
import type { SanitizedConfig } from 'payload'
import payload from 'payload'

import imp_parteneri from 'import_data/partners.json'
import imp_categorii from 'import_data/categorii.json'
import imp_materiale from 'import_data/materiale.json'

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
  ok = await confirm('Create Materiale?')
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

  payload.logger.info('Successfully seeded!')
}
