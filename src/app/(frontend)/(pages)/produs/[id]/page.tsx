import { getPayload } from 'payload'
import config from '@payload-config'
import { Categorii, Imgprod, Parteneri } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { Separator } from '@/components/ui/separator'

export default async function Produs({ params }: { params: Promise<{ id: string }> }) {
  const payload = await getPayload({ config })

  const { id } = await params
  const prod = await payload.findByID({
    collection: 'produse',
    id: id,
  })

  if (!prod) {
    return <div>product id {id} not found!</div>
  }

  const { nume, categorie, materiale, url_producator, descriere, descriere_md, imagini } = prod

  const partener = prod.partener as Parteneri
  const default_img = prod.default_img as Imgprod

  let categorie_denumire, categorie_id
  if (categorie) {
    categorie_denumire = (categorie as Categorii).denumire
    categorie_id = (categorie as Categorii).id
  }
  const poza_src = default_img.sizes!.thumbnail!.url!
  const poza_width = default_img.sizes!.thumbnail!.width!
  const poza_height = default_img.sizes!.thumbnail!.height!

  return (
    <div>
      {/* main */}
      <div className="flex flex-row pt-4 gap-8">
        <div className="flex-2/3 flex flex-col gap-4">
          <h2 className="text-3xl leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-bold tracking-tight">
            {nume}
          </h2>
          <p>{descriere}</p>
          <p>Partener: {partener.nume}</p>
          <code>{url_producator}</code>
          <div>
            Categorie: <Link href={`/categorii/${categorie_id}`}>{categorie_denumire}</Link>
          </div>
          <div>Materiale:</div>
        </div>
        {/*  */}
        <div className="flex-1/3">
          <Image src={poza_src} alt="" width={poza_width} height={poza_height} />
        </div>
      </div>
      <Separator className="m-4" />
      {/* markdown */}
      <MDXRemote source={descriere_md!} />
    </div>
  )
}
