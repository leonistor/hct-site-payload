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

function slugify(str: string): string {
  str = str.replace(/^\s+|\s+$/g, '') // trim leading/trailing white space
  str = str.toLowerCase() // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
  return str
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
  const imp_categorii = JSON.parse(await readFile('categorii.json')) as {
    denumire: string
    icon: string
    _order: string
    import_parteneri: string
  }[]
  const imp_materiale = JSON.parse(await readFile('materiale.json')) as {
    denumire: string
    denumire_en: string
    descriere: string
    icon: string
    _order: string
  }[]

  // categorii
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

  // materiale
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
  const placeholder = await payload.create({
    collection: 'imgprod',
    filePath: PLACEHOLDER,
    data: { alt: 'Image Placeholder' },
  })

  result = imp_prodse.map(async (p) => {
    const { partner, name, categ, desc, url, img } = p

    // imagine produs
    let imageOK = true
    const imageFilePath = `${BASE}photos/${partner}/${img}`

    // check if image exists in import data
    if (img.length > 0) {
      if (!existsSync(imageFilePath)) {
        imageOK = false
        payload.logger.warn(`image not found: ${partner} ${img}`)
      }
    } else {
      imageOK = false
      payload.logger.warn(`${partner} ${name} has no image`)
    }

    // upload image
    const image_filename = partner + '__' + slugify(name)
    const uploadedImage = await payload
      .create({
        collection: 'imgprod',
        data: {
          alt: `${partner} ${name}`,
          filename: image_filename,
        },
        filePath: imageFilePath,
      })
      .catch((error) => {
        payload.logger.error(`imgprod error: ${imageFilePath}, ${JSON.stringify(error)}`)
      })

    // get partener from code
    const partener = created_partneri.get(partner)

    // create produs with image
    await payload.create({
      collection: 'produse',
      draft: true,
      data: {
        nume: name,
        descriere: desc,
        partener: partener,
        imagini: [imageOK ? uploadedImage! : placeholder],
        url_producator: url,
        import_img_name: img,
        import_cod_partener: partner,
        import_categorie: categ,
      },
    })
    payload.logger.info(`created produs: ${name}`)
  })
  await Promise.all(result)
  payload.logger.info('done: Produse')

  payload.logger.info('Successfully seeded!')
}
