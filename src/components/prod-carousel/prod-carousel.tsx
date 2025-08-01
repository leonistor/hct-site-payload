// https://ui.stackzero.co/docs/components/image-carousel/horizontal
'use client'
import ImageCarouselBasic, { CarouselImages } from '@/components/commerce-ui/image-carousel-basic'

// TODO: pass width height for image zoom

export default function ProdCarousel({ images }: { images: CarouselImages }) {
  return <ImageCarouselBasic images={images} imageFit="contain" thumbPosition="right" />
}
