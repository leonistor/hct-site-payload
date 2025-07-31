import type { CollectionConfig } from 'payload'

export const Materiale: CollectionConfig = {
  slug: 'materiale',
  labels: {
    singular: 'Material',
    plural: 'Materiale',
  },
  access: {
    read: () => true,
  },
  orderable: true,
  fields: [
    { name: 'denumire', type: 'text', required: true },
    { name: 'denumire_en', type: 'text' },
    { name: 'icon', type: 'text' },
    { name: 'descriere', type: 'textarea' },
  ],
  admin: { useAsTitle: 'denumire', pagination: { defaultLimit: 30 }, group: 'Catalog' },
}
