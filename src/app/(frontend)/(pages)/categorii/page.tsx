'use client'

import { Separator } from '@/components/ui/separator'
import DemoLista from '../../components/DemoLista'

export default function Categorii() {
  return (
    <div>
      <p className="text-3xl font-semibold">Categorii</p>
      <Separator className="m-2" />
      <DemoLista />
    </div>
  )
}
