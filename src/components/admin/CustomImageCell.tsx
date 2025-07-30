// https://dev.to/aaronksaunders/display-images-in-your-payload-cms-admin-collection-list-with-custom-cell-component-8f9
import React from 'react'
import Image from 'next/image'

import { type DefaultServerCellComponentProps } from 'payload'

import { CameraOff } from 'lucide-react'

export const MyComponent = async ({ cellData, payload }: DefaultServerCellComponentProps) => {
  let image
  // TODO: use Thumbnail from @payload/ui, example: ui/src/elements/Table/DefaultCell/fields/File/index.tsx

  try {
    const media = await payload.findByID({
      collection: 'media',
      id: cellData,
    })

    const scale = 0.7
    image = (
      <Image
        src={media.url!}
        alt={media.alt}
        width={435 * scale}
        height={130 * scale}
        style={{
          objectFit: 'none',
        }}
      />
    )
  } catch (_error) {
    image = <CameraOff size={40} />
  }

  return (
    <div
      style={{
        position: 'relative',
        // width: '80px',
        // height: '60px',
        // marginTop: '-5px',
        // marginBottom: '-5px',
        // transform: 'scale(0.6)',
        // border: '3px solid',
      }}
    >
      {image}
    </div>
  )
}
