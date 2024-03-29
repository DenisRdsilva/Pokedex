"use client"

import { Flex } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import Footer from './components/footer'
import Navbar from './components/navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

import React from 'react'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <head>
        <title>
          Pokedex
        </title>
      </head>
      <body>
        <Providers>
          <Flex fontFamily={'Century'} direction='column'>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Flex>
        </Providers>
      </body>
    </html>
  )
}
