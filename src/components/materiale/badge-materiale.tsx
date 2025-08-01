import { Badge } from '@/components/ui/badge'
import { Materiale } from '@/payload-types'
import Link from 'next/link'

export function BadgeMaterial({ material, props }: { material: Materiale; props?: typeof Badge }) {
  // TODO: icon material
  return (
    <Badge asChild {...props} className="mr-1">
      <Link href={`/materiale/${material.id}`}>{material.denumire}</Link>
    </Badge>
  )
}

export function ListaBadgeMateriale({ materiale }: { materiale: Materiale[] }) {
  return (
    <div className="inline-block">
      <div className="flex flex-wrap">
        {materiale.map((material) => {
          return <BadgeMaterial material={material} key={material.id} />
        })}
      </div>
    </div>
  )
}
