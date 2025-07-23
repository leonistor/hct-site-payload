import { sampleSize } from 'es-toolkit'
import type { SanitizedConfig } from 'payload'
import payload from 'payload'

// TODO: fake data

const SIZE = 8

/** main script */
export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  payload.logger.info('oferta=true pentru random 8 products')

  const all_ids = (
    await payload.find({
      collection: 'produse',
      pagination: false,
    })
  ).docs.map((p) => p.id) as number[]

  const ids = sampleSize(all_ids, SIZE)
  console.log(`selected ids: ${ids}`)

  const result = await payload.update({
    collection: 'produse',
    where: {
      id: { in: ids },
    },
    data: {
      promo: true,
    },
  })
  console.log('errors: ', result.errors)

  payload.logger.info('✅ Done!')
}
