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
import { Imgprod, Parteneri, Produse } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

const columns: ColumnDef<Produse>[] = [
  {
    accessorKey: 'default_img',
    header: '',
    cell: (row) => {
      const imgprod = row.default_img! as Imgprod
      const imgsrc = imgprod.url!
      return <Image src={imgsrc} width={200} height={200} alt={row.nume} />
    },
  },
  {
    accessorKey: 'nume',
    header: 'Nume',
    enableSorting: true,
    cell: (row) => <Link href={`/produs/${row.id}`}>{row.nume}</Link>,
  },
  {
    accessorKey: 'partener',
    header: 'Partener',
    enableSorting: true,
    cell: (row) => {
      const partener = row.partener! as Parteneri
      return <Link href={`/partener/${partener.id}`}>{partener.nume}</Link>
    },
  },
]

export default function DemoLista() {
  const stringifiedQuery = stringify({ where: query }, { addQueryPrefix: true })
  const { data, error, isLoading } = useSWR<PaginatedDocs<Produse>>(
    `/api/produse${stringifiedQuery}`,
    fetcher,
  )
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const items = data!.docs

  return (
    <div className="p-4">
      <Table<Produse>
        data={items}
        columns={columns}
        paginationMode="auto"
        itemsPerPage={5}
        classNames={{
          container: '',
          table: 'w-full text-sm',
          thead: '',
          th: 'p-3 font-medium text-left',
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
