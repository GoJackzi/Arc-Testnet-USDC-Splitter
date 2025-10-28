# Arc USDC Splitter 💰

Hey there! 👋 This is a super cool web app that automatically splits your USDC payments on Arc Testnet. Just send some USDC to the contract and watch it magically distribute to three recipients - no manual work needed!

Think of it like having a smart piggy bank that automatically gives 50% to one person, 30% to another, and 20% to a third person. Pretty neat, right?

## What makes this awesome? ✨

- **🤖 It's automatic**: Set it and forget it - payments split themselves!
- **📱 Works everywhere**: Desktop, mobile, tablet - you name it
- **🔗 Wallet friendly**: Works with MetaMask, WalletConnect, and more
- **🌐 Smart switching**: Automatically switches to Arc Testnet (no confusion!)
- **👀 See before you send**: Preview exactly how your money will be split
- **📊 Live updates**: Watch balances and totals update in real-time
- **🔍 Track everything**: Every transaction is visible on ArcScan

## Let's get you started! 🚀

### What you'll need
- **Node.js** (version 18 or newer) - [Download here](https://nodejs.org/)
- **A crypto wallet** - MetaMask works great, but others are fine too
- **Some testnet USDC** - Don't worry, it's free! Get it from [Circle's faucet](https://faucet.circle.com)

### Getting it running (it's easier than you think!)

1. **Grab the code**
   ```bash
   git clone https://github.com/GoJackzi/Arc-Testnet-USDC-Splitter.git
   cd Arc-Testnet-USDC-Splitter
   ```

2. **Install the good stuff**
   ```bash
   npm install
   ```

3. **Create your config file**
   Make a new file called `.env.local` and add this:
   ```env
   NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
   NEXT_PUBLIC_ARC_CHAIN_ID=5042002
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x396972457146298cD8109F7B34703F180d586fF9
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   ```

4. **Fire it up!**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Head over to [http://localhost:3000](http://localhost:3000) and you're good to go! 🎉

## How to use it (super simple!) 💰

1. **Connect your wallet**
   - Click that big "Connect Wallet" button
   - The app will automatically switch you to Arc Testnet (pretty smart, huh?)

2. **Get some free testnet USDC**
   - Go to [Circle's faucet](https://faucet.circle.com)
   - Pick "Arc Testnet" from the dropdown
   - Paste your wallet address
   - Hit request and boom - free testnet money! 💸

3. **Split some payments**
   - Type in how much USDC you want to split (like 10 USDC)
   - Watch the magic preview show you: 5 USDC, 3 USDC, 2 USDC
   - Click "Send Payment" and confirm in your wallet
   - Sit back and watch it automatically split! 🎯

4. **Track your transactions**
   - See everything happening in real-time
   - Click any transaction link to see it on ArcScan
   - Feel like a crypto wizard! 🧙‍♂️

## The technical stuff (for the curious minds) 🏗️

- **Contract Address**: `0x396972457146298cD8109F7B34703F180d586fF9`
- **Network**: Arc Testnet (Chain ID: 5042002)
- **Explorer**: [ArcScan](https://testnet.arcscan.app/address/0x396972457146298cD8109F7B34703F180d586fF9) (check it out!)
- **Split Ratio**: 50% / 30% / 20% (totally customizable if you know Solidity)
- **Gas Token**: USDC (because why not use stablecoins for everything?)

## What's under the hood? 🛠️

This baby is built with some pretty cool tech:
- **Next.js 16** - The React framework that makes everything fast
- **Tailwind CSS** - Makes everything look beautiful without the headache
- **Wagmi + Viem** - The Web3 magic that talks to your wallet
- **shadcn/ui** - Pre-built components that look professional
- **TypeScript** - Because we like our code to actually work 😄

## Want to contribute? 🤝

Found a bug? Have an idea? Want to make it even cooler? We'd love your help!

1. Fork this repo (click that fork button!)
2. Create your own branch (`git checkout -b feature/my-awesome-idea`)
3. Make your changes and commit them (`git commit -m 'Add my awesome idea'`)
4. Push to your branch (`git push origin feature/my-awesome-idea`)
5. Open a Pull Request and let's chat about it!

## The boring legal stuff 📄

This project is open source and free to use under the MIT License. Basically, you can do whatever you want with it - just don't blame us if something goes wrong! 😉

## Shoutouts 🙏

Big thanks to:
- [Arc Network](https://arc.network) - For building an amazing testnet
- [Circle](https://circle.com) - For USDC and keeping the faucet flowing
- [Next.js](https://nextjs.org) - For making React development actually enjoyable
- [Wagmi](https://wagmi.sh) - For making Web3 integration not a nightmare

---

Made with ❤️ by Musky for ARC