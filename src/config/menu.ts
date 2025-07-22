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
  { href: '#', label: 'Despre noi' },
  { href: '/lista', label: 'Lista' },
  {
    label: 'Produse',
    submenu: true,
    type: 'description',
    items: [
      {
        href: '#',
        label: 'Components',
        description: 'Browse all components in the library.',
      },
      {
        href: '#',
        label: 'Documentation',
        description: 'Learn how to use the library.',
      },
      {
        href: '#',
        label: 'Templates',
        description: 'Pre-built layouts for common use cases.',
      },
    ],
  },
  {
    label: 'Parteneri',
    submenu: true,
    type: 'simple',
    items: [
      { href: '#', label: 'Product A' },
      { href: '#', label: 'Product B' },
      { href: '#', label: 'Product C' },
      { href: '#', label: 'Product D' },
    ],
  },
  {
    label: 'Servicii',
    submenu: true,
    type: 'icon',
    items: [
      { href: '#', label: 'Getting Started', icon: 'BookOpenIcon' },
      { href: '#', label: 'Tutorials', icon: 'LifeBuoyIcon' },
      { href: '#', label: 'About Us', icon: 'InfoIcon' },
    ],
  },
]
