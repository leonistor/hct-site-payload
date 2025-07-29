import type { CollectionConfig } from 'payload'

export const Produse: CollectionConfig = {
  slug: 'produse',
  labels: {
    singular: 'Produs',
    plural: 'Produse',
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
  fields: [
    { name: 'nume', type: 'text', required: true },
    { name: 'descriere', type: 'textarea', admin: { rows: 4 } },
    { name: 'partener', type: 'relationship', relationTo: 'parteneri' },
    { name: 'categorie', type: 'relationship', relationTo: 'categorii' },
    {
      name: 'versiuni',
      type: 'array',
      labels: {
        singular: 'Versiune',
        plural: 'Versiuni',
      },

      fields: [
        { name: 'cod', type: 'text' },
        { name: 'descriere', type: 'text' },
      ],
      admin: {
        description: 'Versiuni de produs',
        initCollapsed: true,
        disableListFilter: true,
        disableBulkEdit: true,
      },
    },
    {
      name: 'promo',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Promovat in liste produse' },
    },
    {
      name: 'materiale',
      type: 'relationship',
      relationTo: 'materiale',
      hasMany: true,
      admin: { isSortable: true },
    },
    { name: 'imagini', type: 'relationship', relationTo: 'imgprod', hasMany: true },
    { name: 'url_producator', type: 'text' },
    {
      type: 'collapsible',
      label: 'Import data',
      fields: [
        { name: 'import_img_name', type: 'text' },
        { name: 'import_cod_partener', type: 'text' },
        { name: 'import_categorie', type: 'text' },
      ],
    },
  ],
  admin: {
    useAsTitle: 'nume',
    defaultColumns: ['nume', 'categorie', 'partener', 'promo', '_status'],
  },
}
