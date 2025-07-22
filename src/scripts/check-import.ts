import { groupBy } from 'es-toolkit'
import { toPairs } from 'es-toolkit/compat'

import prods from 'import_data/prods.json'

async function main() {
  console.log('Checking duplicate product photos')
  const imgs = groupBy(prods, (prod) => prod.img)

  const duplicates = toPairs(imgs).filter(([_k, v]) => v.length > 1)

  console.log(JSON.stringify(duplicates, null, 2))
}

main().catch(console.error)
