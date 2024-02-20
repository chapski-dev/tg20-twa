export const tonAddressExplorerLink = 'https://testnet.ton.cx/address/'

export const AppRoutes = {
  Home: '/',
  Inscribe: '/inscribe',
  Marketplace: '/marketplace',

  Inscriptions: '/inscriptions',
  Deploy: '/inscriptions/deploy',
  Token: '/inscriptions/token/:id',

  Mint: '/mint',
  Swap: '/swap',
  Notifications: '/notifications',

  MyWallet: '/my-wallet',
  TransferHistory: '/my-wallet/transfer-history/:tick',
  TransferDetailed: '/my-wallet/transfer-detailed/:hash',
} as const

export const getVerifiedLink =
  'https://docs.tg20.com/introduction/get-your-project-verified'
