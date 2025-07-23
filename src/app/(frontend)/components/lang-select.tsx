// https://github.com/on-the-edge-cloud/react-circle-flags
// https://nextjs.org/docs/app/getting-started/linking-and-navigating#windowhistoryreplacestate
// https://www.shadcnui-blocks.com/components/select
'use client'

import React from 'react'
import { CircleFlag } from 'react-circle-flags'

// TODO: lang select
export default function LangSelect() {
  return <CircleFlag countryCode="ro" width={15} height={15} />
}
