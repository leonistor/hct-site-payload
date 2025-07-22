import type { CollectionConfig } from 'payload'

export const ImaginiProduse: CollectionConfig = {
  slug: 'imgprod',
  labels: {
    singular: 'Imagine Produs',
    plural: 'Imagini Produse',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'alt', type: 'text', required: false },
    { name: 'partener', type: 'relationship', relationTo: 'parteneri', required: false },
  ],
  upload: {
    staticDir: 'public/imgprod',
    mimeTypes: ['image/*'],
    displayPreview: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
