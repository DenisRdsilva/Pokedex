'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
    
  const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  }

  const theme = extendTheme({ breakpoints })

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}