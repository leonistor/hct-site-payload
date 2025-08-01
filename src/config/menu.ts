interface MenuItem {
  href: string
  label: string
  description?: string
  type?: 'simple' | 'icon' | 'description'
  icon?: string
  submenu?: boolean
  items?: MenuItem[]
}

export const navigationLinks: Partial<MenuItem>[] = [
  {
    label: 'Companie',
    submenu: true,
    type: 'simple',
    items: [
      {
        href: '/despre',
        label: 'Despre noi',
      },
      {
        href: '/parteneri',
        label: 'Parteneri',
      },
      {
        href: '/clienti',
        label: 'Clienți și proiecte',
      },
    ],
  },
  {
    label: 'Produse',
    submenu: true,
    type: 'description',
    items: [
      {
        href: '/categorii',
        label: 'Categorii',
        description:
          'Echipamente pentru tăiere, dezmembrare tocare, mărunțire și granulare. Prese de balotat și compactoare. Dezmembrare vehicule și motoare. Recuperare, stocare și analiză fluide. Sisteme de sortare',
      },
      {
        href: '/materiale',
        label: 'Materiale',
        description:
          'Reciclarea metalelor, aluminiului, cablurilor. Vehicule scoase din uz, Motoare, DEEE, Hidrapulper. Deșeuri solide urbane. Conserve. Metale mixte.',
      },
      {
        href: '/lista',
        label: 'Toate produsele - Tabel',
        description: 'Toate produsele sub forma de tabel',
      },
      {
        href: '/grid',
        label: 'Toate produsele - Grid',
        description: 'Toate produsele sub forma de grid',
      },
    ],
  },
  {
    label: 'Servicii',
    submenu: true,
    type: 'simple',
    items: [
      { label: 'Instalare și montaj', href: '/servicii-instalare' },
      { label: 'Întreținere și recondiționare', href: '/servicii-intretinere' },
      { label: 'Consumabile', href: '/consumabile' },
    ],
  },
  { href: '/blog', label: 'Noutăți' },
  { href: '/contact', label: 'Contact' },
]
