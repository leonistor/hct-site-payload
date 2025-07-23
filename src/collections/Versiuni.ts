import { Block } from 'payload'

export const Versiuni: Block = {
  slug: 'versiuni',
  labels: {
    singular: 'Versiune',
    plural: 'Versiuni',
  },
  fields: [
    {
      name: 'versiune',
      type: 'text',
    },
    {
      name: 'descriere',
      type: 'text',
    },
  ],
}
