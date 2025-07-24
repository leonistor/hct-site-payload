'use client'

import { Separator } from '@/components/ui/separator'
import DemoLista from '../../components/DemoLista'

export default function Categorii() {
  return (
    <div>
      <div className="prose dark:prose-invert lg:prose-xl">
        <h1>Categorii</h1>
      </div>
      <Separator className="m-2" />
      <DemoLista />
    </div>
  )
}
