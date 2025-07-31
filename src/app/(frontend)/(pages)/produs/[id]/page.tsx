import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Produs({ params }: { params: Promise<{ id: string }> }) {
  const payload = await getPayload({ config })

  const { id } = await params
  const prod = await payload.findByID({
    collection: 'produse',
    id: id,
  })

  return (
    <div>
      <code>{JSON.stringify(prod)}</code>
    </div>
  )
}
