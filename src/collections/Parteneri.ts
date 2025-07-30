import type { CollectionConfig } from 'payload'

export const Parteneri: CollectionConfig = {
  slug: 'parteneri',
  labels: {
    singular: 'Partener',
    plural: 'Parteneri',
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
