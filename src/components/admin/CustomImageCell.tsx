// https://dev.to/aaronksaunders/display-images-in-your-payload-cms-admin-collection-list-with-custom-cell-component-8f9
import React from 'react'
import Image from 'next/image'
import { type DefaultServerCellComponentProps } from 'payload'

export const MyComponent = async ({ cellData, payload }: DefaultServerCellComponentProps) => {
  // TODO: not found case
  const media = await payload.findByID({
    collection: 'media',
    id: cellData,
  })

  return (
    <div
      style={{
        position: 'relative',
        // width: '80px',
        height: '60px',
        marginTop: '-5px',
        marginBottom: '-5px',
        // transform: 'scale(0.6)',
        // border: '3px solid',
      }}
    >
      <Image
        src={media.url!}
        alt={media.alt}
        fill
        style={{
          objectFit: 'none',
        }}
      />
    </div>
  )
}
