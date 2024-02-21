export type TopToken = {
  holders: number
  mintable: boolean
  supply: number
  tick: string
  total_supply: number
  verified: boolean
  volume_24h: number
  create_time: number
  image_url: string
}

export type Token = TopToken & {
  address: string
  deploy_time: number
  deploy_hash: string
  owner: string
  mint_limit: number
  royalty_address: string
}

export type TokenBalance = {
  address: string
  tick: string
  balance: number
  floor_price: number
}

export type TokenHolder = {
  holder: string
  balance: number
}

export type PaginatedTokenHoldersList = {
  results: TokenHolder[]
  tick: string
  totalPages: number
}

export type TransferHistoryType = {
  address: string
  tick: string
  time: number
  hash: string
  delta: number
  comment: string
  peer: string
  lt: number
}

export type MarketplaceLot = {
  id: number
  address: string
  tick: string
  seller: string
  buyer: string | null
  amount: number
  total: number
  price: number
  created_at: number
  closed_at: number | null
  status: LotStatus
  market_fee_percent: number
}

export type PaginatedMarketplaceLotsList = {
  items: MarketplaceLot[]
  total: number
}

export type LotSort =
  | 'amount'
  | 'price_per_unit'
  | 'total_cost'
  | 'created_at'
  | 'closed_at'

export type LotSortDirection = 'asc' | 'desc'

export type LotStatus = 'active' | 'completed'

export type MarketplaceStats = {
  total_volume: number
  volume_24h: number
}

export type MarketplaceTokenStats = {
  total_volume: number
  volume_24h: number
  total_operations: number
  floor_price: number
  market_cap: number
}

export type TopTokenFilter =
  | 'all'
  | 'new'
  | 'volume'
  | 'trending'
  | 'holders'
  | 'usage'

export type ValidateImageStatus = {
  status: string
  mime: string
}
