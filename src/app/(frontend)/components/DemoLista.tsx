'use client'

import useSWR from 'swr'
const fetcher = (url: string | URL) => fetch(url).then((r) => r.json())

import { stringify } from 'qs-esm'
import type { PaginatedDocs, Where } from 'payload'
const query: Where = {
  promo: {
    equals: true,
  },
}

import { Table } from 'flowers-nextjs-table'
import type { ColumnDef } from 'flowers-nextjs-table'
import { Imgprod, Produse } from '@/payload-types'

type Item = {
  id: string
  nume: string
  desc: string
  url: string
  image: string
}

// 2. Create your column definitions
const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'nume',
    header: 'Denumire Name',
    enableSorting: true, // This column is now sortable
  },
  {
    accessorKey: 'desc',
    header: 'Descriere',
  },
]

export default function DemoLista() {
  const stringifiedQuery = stringify({ where: query }, { addQueryPrefix: true })
  const { data, error, isLoading } = useSWR<PaginatedDocs<Produse>>(
    `http://localhost:3000/api/produse${stringifiedQuery}`,
    fetcher,
  )
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const items: Item[] = data!.docs.map((p) => {
    const img = p.imagini![0] as Imgprod
    return {
      id: p.id.toString(),
      nume: p.nume,
      desc: p.descriere!,
      url: p.url_producator!,
      image: img.url!,
    }
  })

  return (
    <div className="p-4">
      <Table<Item>
        data={items}
        columns={columns}
        classNames={{
          container: '',
          table: 'w-full text-sm',
          thead: '',
          th: 'p-3 font-medium text-left',
          tr: 'hover:bg-gray-50',
          td: 'p-3 border-t border-gray-200',
          resizer: 'w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize',
          pagination: {
            container: 'p-3 border-t',
            button: 'px-3 py-1 border rounded-md hover:bg-gray-100',
            pageInfo: 'text-sm text-gray-600',
          },
        }}
      />
    </div>
  )
}
