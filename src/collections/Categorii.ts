import type { CollectionConfig } from 'payload'

export const Categorii: CollectionConfig = {
  slug: 'categorii',
  labels: {
    singular: 'Categorie',
    plural: 'Categorii',
  },
  versions: {
    drafts: {
      autosave: { showSaveDraftButton: true },
    },
  },
  access: {
    read: ({ req }) => {
      // If there is a user logged in, let them retrieve all documents
      if (req.user) return true
      // If there is no user restrict the documents that are returned to only those where `_status` is equal to `published`
      return {
        _status: {
          equals: 'published',
        },
      }
    },
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
  admin: { useAsTitle: 'denumire', defaultColumns: ['denumire', 'icon'] },
}
