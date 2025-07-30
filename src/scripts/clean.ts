import type { CollectionSlug, SanitizedConfig } from 'payload'
import payload from 'payload'

import { confirm } from '@topcli/prompts'

async function deleteCollection(collection: CollectionSlug) {
  const count = (await payload.count({ collection })).totalDocs
  const confirmContinue = await confirm(`${collection} has ${count} documents. Continue?`, {
    initial: true,
  })
  payload.logger.info(`created user $admin_user.id}`)
  if (confirmContinue) {
    await payload.delete({ collection, where: {} })
  }
}

/** main script */
export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  payload.logger.info('⚠️ Wipe database')

  const confirmContinue = await confirm('Will delete tables! Continue?', { initial: true })
  if (!confirmContinue) {
    process.exit(0)
  }

  await deleteCollection('categorii')
  await deleteCollection('imgprod')
  await deleteCollection('parteneri')
  await deleteCollection('media')
  await deleteCollection('produse')

  payload.logger.info('✅ Clean database')
}
