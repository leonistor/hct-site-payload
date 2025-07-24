import { Separator } from '@/components/ui/separator'
import { Heading1 } from '../../components/typography'

import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import { Media } from '@/payload-types'

export default async function Parteneri() {
  const payload = await getPayload({ config })
  const parteneri = await payload.find({
    collection: 'parteneri',
    pagination: false,
    depth: 2,
  })
  console.log(parteneri)
  return (
    <div>
      <Heading1 text="Parteneri" />
      <Separator className="m-4" />
      <div className="">
        <p className="text-center text-xl">Companies worldwide already trust us</p>
        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-14 gap-y-10">
          {parteneri.docs.map((partener) => {
            const logo = partener.logo! as Media
            const SCALE = 0.7
            const width = logo.width! * SCALE
            const height = logo.height! * SCALE

            return (
              <div key={partener.id}>
                <Image
                  src={logo.thumbnailURL!}
                  className="rounded-sm"
                  alt={partener.nume}
                  width={width}
                  height={height}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
