'use client'

import { Produse } from '@/payload-types'
import { useRowLabel } from '@payloadcms/ui'

export const VarianteRowLabel = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<Produse['variante']>>()
  console.log(data)

  const customLabel = `${'Varianta'} ${String(rowNumber).padStart(2, '0')} `

  return <div>{customLabel}</div>
}
