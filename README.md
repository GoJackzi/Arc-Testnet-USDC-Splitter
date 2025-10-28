# Arc USDC Splitter

A beautiful web application for splitting USDC payments on Arc Testnet. Send USDC to the contract and watch it automatically distribute to multiple recipients based on predefined percentages.

## ✨ Features

- **🎯 Automatic Payment Splitting**: 50% / 30% / 20% distribution
- **🔗 Wallet Integration**: Connect with MetaMask, WalletConnect, or injected wallets
- **🌐 Auto Network Switching**: Automatically switches to Arc Testnet
- **📊 Real-time Data**: Live contract balance, total received, and recipient info
- **💡 Split Preview**: See how payments will be distributed before sending
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🔍 Transaction Tracking**: Monitor transaction status with ArcScan links

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Web3 wallet (MetaMask recommended)
- Testnet USDC from [Circle Faucet](https://faucet.circle.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GoJackzi/Arc-Testnet-USDC-Splitter.git
   cd Arc-Testnet-USDC-Splitter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
   NEXT_PUBLIC_ARC_CHAIN_ID=5042002
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x396972457146298cD8109F7B34703F180d586fF9
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💰 How to Use

1. **Connect Your Wallet**
   - Click "Connect Wallet" 
   - The app will automatically switch to Arc Testnet

2. **Get Testnet USDC**
   - Visit [Circle Faucet](https://faucet.circle.com)
   - Select "Arc Testnet"
   - Enter your wallet address
   - Request testnet USDC

3. **Send Payments**
   - Enter the USDC amount you want to split
   - See the preview showing 50%/30%/20% distribution
   - Click "Send Payment"
   - Confirm the transaction in your wallet

4. **Track Transactions**
   - View transaction status in real-time
   - Click transaction links to see details on ArcScan

## 🏗️ Contract Details

- **Contract Address**: `0x396972457146298cD8109F7B34703F180d586fF9`
- **Network**: Arc Testnet (Chain ID: 5042002)
- **Explorer**: [ArcScan](https://testnet.arcscan.app/address/0x396972457146298cD8109F7B34703F180d586fF9)
- **Split Ratio**: 50% / 30% / 20%
- **Gas Token**: USDC (native)

## 🛠️ Technical Stack

- **Frontend**: Next.js 16 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Web3**: Wagmi v2 + Viem v2
- **State Management**: TanStack Query
- **Notifications**: Sonner
- **Icons**: Lucide React

## 📁 Project Structure

```
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configs
├── public/             # Static assets
└── styles/             # Global styles
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ARC_RPC_URL` | Arc Testnet RPC endpoint | Yes |
| `NEXT_PUBLIC_ARC_CHAIN_ID` | Arc Testnet chain ID | Yes |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Deployed contract address | Yes |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | No |

## 🌐 Network Information

### Arc Testnet
- **RPC**: https://rpc.testnet.arc.network
- **Chain ID**: 5042002
- **Currency**: USDC (18 decimals)
- **Explorer**: https://testnet.arcscan.app
- **Faucet**: https://faucet.circle.com

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Arc Network](https://arc.network) for the amazing testnet
- [Circle](https://circle.com) for USDC and faucet
- [Next.js](https://nextjs.org) for the amazing framework
- [Wagmi](https://wagmi.sh) for Web3 integration

---

Made with ❤️ by Musky for ARC