'use client'

import { useReadContract, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract'

// Hook to get contract recipients and percentages
export function useContractRecipients() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getRecipients',
  })
}

// Hook to get contract balance
export function useContractBalance() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getBalance',
  })
}

// Hook to get total received
export function useTotalReceived() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'totalReceived',
  })
}

// Hook to calculate split amounts
export function useCalculateSplit(amount: string) {
  const parsedAmount = amount ? parseEther(amount) : 0n
  
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'calculateSplit',
    args: [parsedAmount],
    query: {
      enabled: !!amount && parsedAmount > 0n,
    },
  })
}

// Hook to send payment to contract
export function useSendPayment() {
  const { sendTransaction, data: hash, error, isPending } = useSendTransaction()
  
  const sendPayment = async (amount: string) => {
    const parsedAmount = parseEther(amount)
    
    // Send ETH directly to contract address to trigger receive() function
    sendTransaction({
      to: CONTRACT_ADDRESS,
      value: parsedAmount,
    })
  }

  return {
    sendPayment,
    hash,
    error,
    isPending,
  }
}

// Hook to wait for transaction confirmation
export function useTransactionReceipt(hash: `0x${string}` | undefined) {
  return useWaitForTransactionReceipt({
    hash,
  })
}

// Utility function to format USDC amounts
export function formatUSDC(amount: bigint | undefined): string {
  if (!amount) return '0.00'
  return formatEther(amount)
}

// Utility function to format addresses
export function formatAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
