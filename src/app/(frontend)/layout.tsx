import React from 'react'
import './styles.css'

import { conf } from '@/config/site'
import { Outfit } from 'next/font/google'

import Header from './sections/Header'
import Footer from './sections/Footer'
import { ThemeProvider } from './components/theme-provider'

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
})

export const metadata = {
  title: conf.title,
  description: conf.description,
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={outfit.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/svg+xml"></link>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto container min-h-screen flex flex-col">
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
