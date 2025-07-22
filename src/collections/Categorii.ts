import type { CollectionConfig } from 'payload'

export const Categorii: CollectionConfig = {
  slug: 'categorii',
  labels: {
    singular: 'Categorie',
    plural: 'Categorii',
  },
  access: {
    read: () => true,
  },
  orderable: true,
  fields: [
    { name: 'denumire', type: 'text', required: true },
    { name: 'icon', type: 'text' },
    { name: 'descriere', type: 'textarea' },
    {
      name: 'import_parteneri',
      type: 'text',
      admin: { description: 'parteneri cu produse in categorie' },
    },
  ],
  admin: { useAsTitle: 'denumire' },
}
