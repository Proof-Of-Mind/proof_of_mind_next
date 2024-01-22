"use client"

// import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// // 1. Get projectId at https://cloud.walletconnect.com
// const projectId = 'e7a2103583aaebbfa817ab3ee662b770'

// // 2. Set chains
// const mainnet = {
//     chainId: 1,
//     name: 'Bitcoin Mainnet',
//     currency: 'BTC',
//     explorerUrl: 'https://mempool.space/',
//     rpcUrl: 'https://connect.bitcoinevm.com'
// }

// // 3. Create modal
// const metadata = {
//     name: 'My Website',
//     description: 'My Website description',
//     url: 'https://mywebsite.com',
//     icons: ['https://avatars.mywebsite.com/']
// }

// createWeb3Modal({
//     themeVariables: {
//         // '--w3m-color-mix': '#00BB7F',
//         '--w3m-accent': 'rgb(147,51,234,1)',
//         '--w3m-color-mix-strength': 40
//     },
//     ethersConfig: defaultConfig({ metadata }),
//     chains: [mainnet],
//     projectId
// })

// export function Web3ModalProvider({ children }: any) {
//     return children;
// }