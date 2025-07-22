import { existsSync, promises as fs } from 'fs'

import type { Parteneri } from '@/payload-types'
import type { SanitizedConfig } from 'payload'
import payload from 'payload'

const BASE = 'import_data/'
const PLACEHOLDER = `${BASE}image_placeholder.png`

async function readFile(fileName: string): Promise<string> {
  const content = await fs.readFile(BASE + fileName, 'utf8')
  return content
}

/** main script */
export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  const created_partneri = new Map<string, Parteneri>()
  let result: Promise<void>[]

  // prepare data
  const imp_partners = JSON.parse(await readFile('partners.json')) as {
    id: string
    name: string
    desc: string
    url: string
  }[]
  const imp_prodse = JSON.parse(await readFile('prods.json')) as {
    desc_translated: string
    partner: string
    name: string
    categ: string
    desc: string
    url: string
    imgUrl: string
    img: string
  }[]
  const categorii_txt = await readFile('categorii.txt')
  const imp_categorii = categorii_txt.split('\n')

  // categorii
  result = imp_categorii.map(async (c) => {
    await payload.create({
      collection: 'categorii',
      data: {
        denumire: c,
      },
    })
  })
  await Promise.all(result)
  payload.logger.info('done: Categorii')

  // parteneri
  result = imp_partners.map(async (p) => {
    const { id, name, desc, url } = p

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
        descriere: desc,
        url: url,
      },
    })
    // lookup for produs
    created_partneri.set(id, created)
    payload.logger.info(`created partner: ${id}`)
  })
  await Promise.all(result)
  payload.logger.info('done: Parteneri')

  // --- produse
  // imgprod_placeholder
  await payload.create({
    collection: 'imgprod',
    filePath: PLACEHOLDER,
    data: { alt: 'Image Placeholder' },
  })

  result = imp_prodse.map(async (p) => {
    const { partner, name, categ, desc, url, img } = p

    // imagine produs
    let imageOK = true
    const imageFilePath = `${BASE}photos/${partner}/${img}`

    // check if image exists
    if (img.length > 0) {
      if (!existsSync(imageFilePath)) {
        imageOK = false
        payload.logger.warn(`image not found: ${partner} ${img}`)
      }
    } else {
      imageOK = false
      payload.logger.warn(`${partner} ${name} has no image`)
    }

    // get partener from code
    const partener = created_partneri.get(partner)

    if (imageOK) {
      // create produs with image
      const uploadedImage = await payload
        .create({
          collection: 'imgprod',
          data: { alt: `${partner} ${name}` },
          filePath: imageFilePath,
        })
        .catch((error) => {
          payload.logger.error(`imgprod error: ${imageFilePath}, ${JSON.stringify(error)}`)
        })
      await payload.create({
        collection: 'produse',
        data: {
          nume: name,
          descriere: desc,
          partener: partener,
          imagini: [
            {
              relationTo: 'imgprod',
              value: uploadedImage!,
            },
          ],
          url_producator: url,
          import_img_name: img,
          import_cod_partener: partner,
          import_categorie: categ,
        },
      })
    } else {
      // create produs without image
      await payload.create({
        collection: 'produse',
        data: {
          nume: name,
          descriere: desc,
          partener: partener,
          imagini: [],
          url_producator: url,
          import_img_name: img,
          import_cod_partener: partner,
          import_categorie: categ,
        },
      })
    }
    // payload.logger.info(`created produs: ${name}`)
  })
  await Promise.all(result)
  payload.logger.info('done: Produse')

  payload.logger.info('Successfully seeded!')
}
