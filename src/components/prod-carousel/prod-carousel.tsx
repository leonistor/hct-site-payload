// https://ui.stackzero.co/docs/components/image-carousel/horizontal
'use client'
import ImageCarouselBasic, { CarouselImages } from '@/components/commerce-ui/image-carousel-basic'

// const images: CarouselImages = [
//   {
//     title: 'Coffee Machine 1',
//     url: 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/coffee-machine-01.jpg',
//   },
//   {
//     title: 'Coffee Machine 2',
//     url: 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/coffee-machine-02.jpg',
//   },
//   {
//     title: 'Coffee Filter',
//     url: 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/coffee-filter-01.jpg',
//   },
//   {
//     title: 'Coffee Cups',
//     url: 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/coffee-cups-01.jpg',
//   },
// ]

export default function ProdCarousel({ images }: { images: CarouselImages }) {
  return <ImageCarouselBasic images={images} imageFit="contain" thumbPosition="right" />
}
