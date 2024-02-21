export const BASE_API_URL = 'https://api-2.gram20.com/v1/gram20'

export const BASE_API_URL_V2 = 'https://api-2.gram20.com/v2/gram20'

export const BASE_API_URL_V3 = 'https://api-2.gram20.com/v3/gram20'

export const TON_CLIENT_URL = 'https://toncenter-v4.gram20.com/jsonRPC'

export const HUOBI_API_URL = 'https://api.huobi.pro'

export const ApiRoutes = {
  TopTokensList: '/top',
  Balance: '/balance',
  TokenInfo: '/tick',
  TokenHolders: '/holders',
  TransfersHistory: '/history',
  CheckHash: '/check',
  HuobiMarketTonPrice: '/market/trade?symbol=tonusdt',
  MarketplaceListing: '/marketplace',
  MarketplaceStats: '/stats/marketplace',
  SearchTokens: '/search',
  MaketplaceTicks: '/marketplace_ticks',
  ImageValidate: '/image',
  SearchedOrder: '/order',
} as const
