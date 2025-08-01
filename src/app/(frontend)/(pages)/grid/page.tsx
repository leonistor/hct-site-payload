import { getPayload } from 'payload'
import config from '@payload-config'
import { Imgprod, Parteneri } from '@/payload-types'
import FixedColumnsMasonry from '../../components/FixedColumnsMasonry'

export default async function Lista() {
  const payload = await getPayload({ config })
  const promoProducts = await payload.find({
    collection: 'produse',
    pagination: false,
    depth: 2,
    where: {
      promo: { equals: true },
    },
  })

  const items = promoProducts.docs.map((prod) => {
    const prodimg = prod.default_img! as Imgprod
    const prodpartener = prod.partener! as Parteneri
    return {
      id: prod.id.toString(),
      nume: prod.nume,
      partener: prodpartener.nume,
      src: prodimg.sizes!.thumbnail!.url!,
      width: prodimg.sizes!.thumbnail!.width!,
      height: prodimg.sizes!.thumbnail!.height!,
    }
  })

  return (
    <div>
      <p className="mb-4 text-3xl">Produse grid</p>
      <FixedColumnsMasonry items={items} />
    </div>
  )
}
