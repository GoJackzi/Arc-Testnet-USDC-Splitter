'use client'

import type React from "react"
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/wagmi'
import { Toaster } from '@/components/ui/sonner'
import "./globals.css"

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>Arc USDC Splitter</title>
        <meta name="description" content="Split USDC payments on Arc Testnet" />
      </head>
      <body className={`font-sans antialiased`}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
