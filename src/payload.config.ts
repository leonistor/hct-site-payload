// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categorii } from './collections/Categorii'
import { ImaginiProduse } from './collections/ImaginiProduse'
import { Materiale } from './collections/Materiale'
import { Parteneri } from './collections/Parteneri'
import { Produse } from './collections/Produse'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'admin@test.com',
            password: 'test1234',
            prefillOnly: false,
          }
        : false,
  },
  collections: [Users, Media, Parteneri, Produse, Categorii, ImaginiProduse, Materiale],
  editor: lexicalEditor(),
  cors: '*',
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: 'info@payloadcms.com',
    defaultFromName: 'Payload',
    // Nodemailer transportOptions
    transportOptions: {
      host: 'pop-os.lan',
      port: '1025',
      auth: false,
    },
  }),
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  bin: [
    {
      scriptPath: path.resolve(dirname, 'scripts/seed.ts'),
      key: 'seed',
    },
    {
      scriptPath: path.resolve(dirname, 'scripts/clean.ts'),
      key: 'clean',
    },
    {
      scriptPath: path.resolve(dirname, 'scripts/demo.ts'),
      key: 'demo',
    },
    {
      scriptPath: path.resolve(dirname, 'scripts/clean-demo.ts'),
      key: 'cleandemo',
    },
  ],
})
