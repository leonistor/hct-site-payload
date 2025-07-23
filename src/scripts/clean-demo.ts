import type { SanitizedConfig } from 'payload'
import payload from 'payload'

/** main script */
export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  payload.logger.info('Clean demo data')

  await payload.delete({
    collection: 'imgprod',
    where: {
      alt: { equals: 'demo' },
    },
  })

  await payload.delete({
    collection: 'produse',
    where: {
      import_cod_partener: { equals: 'demo' },
    },
  })

  await payload.delete({
    collection: 'media',
    where: {
      filename: { equals: 'logo_demo.png' },
    },
  })
  await payload.delete({
    collection: 'parteneri',
    where: {
      cod: { equals: 'demo' },
    },
  })
  await payload.delete({
    collection: 'categorii',
    where: {
      icon: { equals: 'star' },
    },
  })

  payload.logger.info('✅ Clean demo data')
}
