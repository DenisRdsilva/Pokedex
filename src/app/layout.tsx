"use client"

import './globals.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { Inter } from 'next/font/google'
import { Flex } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>
          Pokedex
        </title>
      </head>
      <body>
        <Flex fontFamily={'Century'} direction='column'>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Flex>
      </body>
    </html>
  )
}
