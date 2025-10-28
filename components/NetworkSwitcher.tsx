'use client'

import { useAccount, useChainId } from 'wagmi'
import { arcTestnet } from '@/lib/wagmi'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, ExternalLink } from 'lucide-react'
import { useState } from 'react'

export function NetworkSwitcher() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const [isAdding, setIsAdding] = useState(false)

  // Only show if connected and NOT on Arc Testnet
  if (!isConnected || chainId === arcTestnet.id) {
    return null
  }

  const addArcNetwork = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask or another Web3 wallet')
      return
    }

    setIsAdding(true)
    try {
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
    } catch (error: any) {
      console.error('Failed to add Arc Testnet:', error)
      if (error.code === 4902) {
        // Chain already added, try to switch
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${arcTestnet.id.toString(16)}` }],
          })
        } catch (switchError) {
          console.error('Failed to switch to Arc Testnet:', switchError)
        }
      }
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Alert className="mb-6 border-orange-200 bg-orange-50">
      <AlertTriangle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <div className="flex items-center justify-between">
          <div>
            <strong>Please switch to Arc Testnet</strong>
            <p className="text-sm mt-1">
              This app requires Arc Testnet to function properly.
            </p>
          </div>
          <Button
            onClick={addArcNetwork}
            disabled={isAdding}
            size="sm"
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isAdding ? 'Switching...' : 'Switch to Arc Testnet'}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}

export function AddArcNetworkButton() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const [isAdding, setIsAdding] = useState(false)

  // If not connected, show add network button
  if (!isConnected) {
    const addArcNetwork = async () => {
      if (!window.ethereum) {
        alert('Please install MetaMask or another Web3 wallet')
        return
      }

      setIsAdding(true)
      try {
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
      } catch (error: any) {
        console.error('Failed to add Arc Testnet:', error)
        if (error.code === 4902) {
          // Chain already added, try to switch
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${arcTestnet.id.toString(16)}` }],
            })
          } catch (switchError) {
            console.error('Failed to switch to Arc Testnet:', switchError)
          }
        }
      } finally {
        setIsAdding(false)
      }
    }

    return (
      <Alert className="mb-6 border-blue-200 bg-blue-50">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <strong>Connect your wallet to get started</strong>
              <p className="text-sm mt-1">
                This app works on Arc Testnet with USDC as gas.
              </p>
            </div>
            <Button
              onClick={addArcNetwork}
              disabled={isAdding}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isAdding ? 'Adding...' : 'Add Arc Testnet'}
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return null
}
