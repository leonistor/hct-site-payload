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
                editorOptions: { fontSize: 14 },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'variante',
      type: 'array',
      labels: {
        singular: 'Varianta',
        plural: 'Variante',
      },
      fields: [
        { name: 'cod', type: 'text' },
        { name: 'descriere', type: 'text' },
        {
          name: 'imagine',
          type: 'relationship',
          relationTo: 'imgprod',
          admin: { appearance: 'drawer' },
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
    {
      name: 'imagini',
      type: 'relationship',
      relationTo: 'imgprod',
      hasMany: true,
      admin: { appearance: 'drawer' },
    },
    {
      type: 'collapsible',
      label: 'Import data',
      admin: { initCollapsed: true },
      fields: [
        { name: 'import_img_name', type: 'text' },
        { name: 'import_cod_partener', type: 'text' },
        { name: 'import_categorie', type: 'text' },
      ],
    },
  ],
  enableQueryPresets: true,
  admin: {
    useAsTitle: 'nume',
    defaultColumns: ['nume', 'categorie', 'partener', 'promo', '_status'],
  },
}
