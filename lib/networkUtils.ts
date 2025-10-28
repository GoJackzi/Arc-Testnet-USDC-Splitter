'use client'

import { arcTestnet } from '@/lib/wagmi'

export async function ensureArcTestnet(): Promise<boolean> {
  if (!window.ethereum) {
    throw new Error('Please install MetaMask or another Web3 wallet')
  }

  try {
    // Check current chain
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    const currentChainId = parseInt(chainId, 16)
    
    if (currentChainId === arcTestnet.id) {
      return true // Already on Arc Testnet
    }

    // Try to switch to Arc Testnet
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${arcTestnet.id.toString(16)}` }],
      })
      return true
    } catch (switchError: any) {
      // If chain doesn't exist, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${arcTestnet.id.toString(16)}`,
              chainName: arcTestnet.name,
              nativeCurrency: {
                name: arcTestnet.nativeCurrency.name,
                symbol: arcTestnet.nativeCurrency.symbol,
                decimals: arcTestnet.nativeCurrency.decimals,
              },
              rpcUrls: arcTestnet.rpcUrls.default.http,
              blockExplorerUrls: [arcTestnet.blockExplorers.default.url],
            },
          ],
        })
        return true
      }
      throw switchError
    }
  } catch (error) {
    console.error('Failed to switch to Arc Testnet:', error)
    throw error
  }
}
