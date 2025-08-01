import { getPayload } from 'payload'
import config from '@payload-config'
import { CarouselBlocks, GalleryItem } from '../blocks/shadcnblocks_gallery6'
import { Imgprod } from '@/payload-types'

export default async function Carousel() {
  const payload = await getPayload({ config })
  const promoProducts = await payload.find({
    collection: 'produse',
    pagination: false,
    depth: 2,
    where: {
      promo: { equals: true },
    },
  })

  const carouselProducts: GalleryItem[] = promoProducts.docs.map((p) => {
    // TODO: replace with default image
    const img = p.imagini![0] as Imgprod

    return {
      id: p.id.toString(),
      title: p.nume,
      summary: p.descriere!,
      url: `/produs/${p.id}`,
      image: img.url!,
    }
  })

  return <CarouselBlocks heading="Noutăți" items={carouselProducts}></CarouselBlocks>
}
