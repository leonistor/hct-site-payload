'use client'

import { Separator } from '@/components/ui/separator'
import DemoLista from '../../components/DemoLista'
import { Heading1 } from '../../components/typography'

export default function Categorii() {
  return (
    <div>
      <Heading1 text="Categorii" />
      <Separator className="m-2" />
      <DemoLista />
    </div>
  )
}
