import type { CollectionConfig } from 'payload'

export const Parteneri: CollectionConfig = {
  slug: 'parteneri',
  labels: {
    singular: 'Partener',
    plural: 'Parteneri',
  },
  access: {
    read: () => true,
  },
  orderable: true,
  fields: [
    { name: 'cod', type: 'text', required: true },
    { name: 'nume', type: 'text', required: true },
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        components: {
          Cell: 'src/components/admin/CustomImageCell#MyComponent',
        },
      },
    },
    { name: 'descriere', type: 'textarea' },
    { name: 'url', type: 'text' },
  ],
  admin: { useAsTitle: 'nume' },
}
