# Arc USDC Splitter

A web application that automatically splits USDC payments on Arc Testnet. Send USDC to the contract and it distributes to three recipients: 50%, 30%, and 20%.

## Features

- Automatic payment splitting (50% / 30% / 20%)
- Wallet integration (MetaMask, WalletConnect)
- Auto-switches to Arc Testnet
- Real-time balance tracking
- Transaction preview before sending
- Mobile responsive

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/GoJackzi/Arc-Testnet-USDC-Splitter.git
   cd Arc-Testnet-USDC-Splitter
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env.local` file
   ```env
   NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
   NEXT_PUBLIC_ARC_CHAIN_ID=5042002
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x396972457146298cD8109F7B34703F180d586fF9
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   ```

4. Start development server
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## Usage

1. Connect your wallet - app automatically switches to Arc Testnet
2. Get testnet USDC from [Circle Faucet](https://faucet.circle.com)
3. Enter amount to split
4. Preview the distribution (50%/30%/20%)
5. Send payment and confirm in wallet

## Contract Details

- **Address**: `0x396972457146298cD8109F7B34703F180d586fF9`
- **Network**: Arc Testnet (Chain ID: 5042002)
- **Explorer**: [ArcScan](https://testnet.arcscan.app/address/0x396972457146298cD8109F7B34703F180d586fF9)
- **Split**: 50% / 30% / 20%
- **Gas**: USDC

## Tech Stack

- Next.js 16
- Tailwind CSS
- Wagmi + Viem
- TypeScript

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

---

Made with ❤️ by Musky for ARC