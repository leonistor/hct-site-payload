'use client'
import Image from 'next/image'
import Masonry from 'react-layout-masonry'

interface Item {
  id: string
  src: string
  nume: string
  partener: string
  width: number
  height: number
}

const FixedColumnsMasonry = ({ items }: { items: Item[] }) => {
  return (
    <Masonry columns={3} gap={16}>
      {items.map((item) => {
        return <Card item={item} key={item.id} />
      })}
    </Masonry>
  )
}

const Card = ({ item }: { item: Item }) => {
  return (
    <div className="flex flex-col gap-4">
      <Image
        className="rounded-md max-w-full"
        src={item.src}
        width={item.width}
        height={item.height}
        alt=""
      />
      <div className="flex flex-col !mt-0">
        <span className="text-lg">{item.nume}</span>
        <span className="text-sm text-slate-500">{item.partener}</span>
      </div>
    </div>
  )
}

export default FixedColumnsMasonry
