"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, ArrowRight, CheckCircle2, ExternalLink, Copy, Loader2 } from "lucide-react"
import { ArcLogo } from "@/components/ArcLogo"
import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi'
import { useContractRecipients, useContractBalance, useTotalReceived, useCalculateSplit, useSendPayment, useTransactionReceipt, formatUSDC, formatAddress } from '@/hooks/useContract'
import { CONTRACT_ADDRESS } from '@/lib/contract'
import { arcTestnet } from '@/lib/wagmi'
import { NetworkSwitcher, AddArcNetworkButton } from '@/components/NetworkSwitcher'
import { ensureArcTestnet } from '@/lib/networkUtils'
import { toast } from 'sonner'

export default function Page() {
  const [amount, setAmount] = useState("")
  
  // Wallet connection
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  
  // Contract data
  const { data: recipients } = useContractRecipients()
  const { data: contractBalance } = useContractBalance()
  const { data: totalReceived } = useTotalReceived()
  const { data: splitCalculation } = useCalculateSplit(amount)
  
  // Send payment
  const { sendPayment, hash, error, isPending } = useSendPayment()
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash)
  
  // Set default contract address
  useEffect(() => {
    if (CONTRACT_ADDRESS) {
      // Contract address is already set in the component
    }
  }, [])

  const handleConnect = async () => {
    if (isConnected) {
      disconnect()
    } else {
      try {
        // Connect wallet first
        await connect({ connector: connectors[0] })
        
        // Auto-switch to Arc Testnet after connection
        setTimeout(async () => {
          try {
            await ensureArcTestnet()
            toast.success("Switched to Arc Testnet!")
          } catch (error) {
            console.error('Failed to switch network:', error)
            toast.error("Please switch to Arc Testnet manually")
          }
        }, 1000) // Wait a bit for connection to complete
      } catch (error) {
        console.error('Connection failed:', error)
        toast.error("Failed to connect wallet")
      }
    }
  }

  const handleSend = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }
    
    try {
      // Ensure we're on Arc Testnet before sending
      await ensureArcTestnet()
      
      await sendPayment(amount)
      toast.success("Transaction submitted!")
    } catch (err) {
      if (err.message?.includes('network')) {
        toast.error("Please switch to Arc Testnet to send payments")
      } else {
        toast.error("Transaction failed")
      }
      console.error(err)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  // Mock recent splits data (in a real app, you'd fetch this from events)
  const recentSplits: Array<{
    id: number
    amount: string
    recipients: number
    timestamp: string
    txHash: string
  }> = []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArcLogo />
            <span className="text-xl font-semibold">Arc USDC Splitter</span>
          </div>
          <div className="flex items-center gap-2">
            {isConnected && address && (
              <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-md">
                <span className="text-sm font-mono">{formatAddress(address)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(address)}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            )}
            <Button
              onClick={handleConnect}
              variant={isConnected ? "outline" : "default"}
              className={isConnected ? "" : "bg-arc-blue hover:bg-arc-blue/90"}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnected ? "Disconnect" : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Split USDC Payments on Arc Testnet</h1>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Send USDC payments that automatically split among multiple recipients. Powered by Arc Network with USDC as
              gas.
            </p>
          </div>


          {/* Contract Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Information</CardTitle>
              <CardDescription>Deployed USDC Payment Splitter contract details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Contract Address</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={CONTRACT_ADDRESS}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(CONTRACT_ADDRESS)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://testnet.arcscan.app/address/${CONTRACT_ADDRESS}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Contract Balance</Label>
                  <p className="text-sm font-mono">{formatUSDC(contractBalance)} USDC</p>
                </div>
                <div>
                  <Label>Total Received</Label>
                  <p className="text-sm font-mono">{formatUSDC(totalReceived)} USDC</p>
                </div>
              </div>

              {recipients && (
                <div>
                  <Label>Recipients & Percentages</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-mono">{formatAddress(recipients[0])}</span>
                      <span className="text-muted-foreground">50%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-mono">{formatAddress(recipients[1])}</span>
                      <span className="text-muted-foreground">30%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-mono">{formatAddress(recipients[2])}</span>
                      <span className="text-muted-foreground">20%</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Send Payment</CardTitle>
              <CardDescription>Send USDC to the contract for automatic splitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USDC)</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pr-16"
                    step="0.01"
                    min="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                    USDC
                  </span>
                </div>
              </div>

              {/* Split Preview */}
              {amount && splitCalculation && (
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium">Split Preview</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Recipient 1 (50%)</span>
                      <span className="font-mono">{formatUSDC(splitCalculation[0])} USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Recipient 2 (30%)</span>
                      <span className="font-mono">{formatUSDC(splitCalculation[1])} USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Recipient 3 (20%)</span>
                      <span className="font-mono">{formatUSDC(splitCalculation[2])} USDC</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleSend}
                disabled={!isConnected || !amount || isPending || isConfirming}
                className="w-full bg-arc-blue hover:bg-arc-blue/90"
                size="lg"
              >
                {(isPending || isConfirming) ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isPending ? "Sending..." : "Confirming..."}
                  </>
                ) : (
                  <>
                    Send Payment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              {!isConnected && (
                <p className="text-sm text-muted-foreground text-center">Connect your wallet to send payments</p>
              )}

              {error && (
                <p className="text-sm text-destructive text-center">Error: {error.message}</p>
              )}

              {isSuccess && (
                <div className="text-center">
                  <p className="text-sm text-green-600 mb-2">✅ Payment sent successfully!</p>
                  {hash && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://testnet.arcscan.app/tx/${hash}`, '_blank')}
                    >
                      View Transaction
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Splits */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Splits</CardTitle>
              <CardDescription>Latest payment splits on the network</CardDescription>
            </CardHeader>
            <CardContent>
              {recentSplits.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No recent splits yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentSplits.map((split) => (
                    <div
                      key={split.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-arc-blue/10 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-arc-blue" />
                        </div>
                        <div>
                          <div className="font-semibold">{split.amount} USDC</div>
                          <div className="text-sm text-muted-foreground">Split among {split.recipients} recipients</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono text-muted-foreground">{split.txHash}</div>
                        <div className="text-xs text-muted-foreground">{split.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Section */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Arc Testnet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Chain ID: 5042002</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Gas Token</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">USDC (6 decimals)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">RPC Endpoint</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground font-mono break-all">rpc.testnet.arc.network</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
