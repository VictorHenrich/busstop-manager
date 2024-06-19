'use client'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { themeDefault } from './themes'


export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={themeDefault}>{children}</ChakraProvider>
}