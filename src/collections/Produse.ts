import type { CollectionConfig } from 'payload'
// import { VarianteRowLabel } from '../components/admin/VarianteRowLabel'

export const Produse: CollectionConfig = {
  slug: 'produse',
  labels: {
    singular: 'Produs',
    plural: 'Produse',
  },
  versions: {
    drafts: {
      autosave: { showSaveDraftButton: true, interval: 800 * 5 },
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
    {
      name: 'nume_en',
      type: 'text',
      required: true,
      admin: { description: 'nume original in engleza' },
    },
    // partners, categories
    {
      type: 'row',
      fields: [
        {
          name: 'partener',
          type: 'relationship',
          relationTo: 'parteneri',
          admin: { allowCreate: false, allowEdit: false },
        },
        {
          name: 'categorie',
          type: 'relationship',
          relationTo: 'categorii',
          admin: { allowCreate: false, allowEdit: false },
        },
      ],
    },
    // promo, materiale
    {
      type: 'row',
      fields: [
        {
          name: 'promo',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Promovat in liste produse', width: '15%' },
        },
        {
          name: 'materiale',
          type: 'relationship',
          relationTo: 'materiale',
          hasMany: true,
          admin: { isSortable: true, allowCreate: false, allowEdit: false, width: '50%' },
        },
        {
          name: 'url_producator',
          type: 'text',
          label: 'URL',
          admin: { width: '35%', description: 'URL produs in site producator' },
        },
      ],
    },
    // descriere
    {
      type: 'tabs',
      tabs: [
        {
          label: 'descriere',
          admin: { description: 'descriere scurtă în liste produse' },
          fields: [{ name: 'descriere', type: 'textarea', admin: { rows: 4 } }],
        },
        {
          label: 'extra',
          admin: { description: 'descriere markdown în pagina produsului' },
          fields: [
            {
              name: 'descriere_md',
              type: 'code',
              admin: {
                language: 'mdx',
                // https://payloadcms.com/docs/fields/code#admin-options
                editorOptions: { fontSize: 14, lineNumbers: 'off' },
              },
            },
          ],
        },
      ],
    },
    // variante
    {
      name: 'variante',
      type: 'array',
      labels: {
        singular: 'Varianta',
        plural: 'Variante',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'cod', type: 'text', admin: { width: '15%' } },
            { name: 'descriere', type: 'text' },
            {
              name: 'imagine',
              type: 'relationship',
              relationTo: 'imgprod',
              admin: { appearance: 'drawer', width: '30%' },
            },
          ],
        },
      ],
      admin: {
        description: 'Variante de produs',
        isSortable: true,
        initCollapsed: false,
        disableListFilter: true,
        disableBulkEdit: true,
        components: {
          // TODO: custom row label w/ cod
          // RowLabel: VarianteRowLabel,
        },
      },
    },
    // default image & gallery
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Default Image',
          admin: { description: 'default image' },
          fields: [
            {
              name: 'default_img',
              type: 'relationship',
              relationTo: 'imgprod',
              admin: { appearance: 'drawer', width: '20%', description: 'default image' },
            },
          ],
        },
        {
          label: 'Gallery',
          admin: { description: 'extra images' },
          fields: [
            {
              name: 'imagini',
              type: 'relationship',
              relationTo: 'imgprod',
              hasMany: true,
              admin: { appearance: 'drawer', width: '80%', description: 'other images' },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Import data',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'descriere_en',
          type: 'text',
          admin: { description: 'descrierea originala in engleza de pe site producator' },
        },
      ],
    },
  ],
  enableQueryPresets: true,
  admin: {
    useAsTitle: 'nume',
    defaultColumns: ['nume', 'categorie', 'partener', 'promo', '_status'],
    group: 'Content',
  },
}
