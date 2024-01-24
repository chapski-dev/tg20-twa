import axios from 'axios'
import { ApiRoutes, HUOBI_API_URL } from 'constants/api'
import { AXIOS_INSTANCE } from 'libs/axios-instance/axios-instance'
import * as ApiTypes from './types'

export const getTopTokensList = async () => {
  const { data } = await AXIOS_INSTANCE.get<ApiTypes.TopToken[]>(
    ApiRoutes.TopTokensList
  )

  return data
}

export const getSearchedTokensList = async (params: { query: string }) => {
  const { data } = await AXIOS_INSTANCE.get<ApiTypes.Token[]>(
    ApiRoutes.SearchTokens,
    { params }
  )

  return data
}

export const getTokenWalletBalance = async (
  walletAddress: string,
  tick: string
) => {
  const { data } = await AXIOS_INSTANCE.get<ApiTypes.TokenBalance>(
    `${ApiRoutes.Balance}/${walletAddress}/${tick}`
  )

  return data
}

export const getWalletTokensBalances = async (walletAddress: string) => {
  const { data } = await AXIOS_INSTANCE.get<ApiTypes.TokenBalance[]>(
    `${ApiRoutes.Balance}/${walletAddress}`
  )

  return data
}

export const getTokenInfo = async (tick: string) => {
  const { data } = await AXIOS_INSTANCE.get<ApiTypes.Token>(
    `${ApiRoutes.TokenInfo}/${tick}`
  )

  return data
}

export const getPaginatedTokenHoldersList = async (
  tick: string,
  params: { count: number; offset: number }
) => {
  const { data } = await AXIOS_INSTANCE.get<ApiTypes.PaginatedTokenHoldersList>(
    `${ApiRoutes.TokenHolders}/${tick}`,
    { params }
  )

  return data
}

export const getTransfersHistory = async (walletAddress: string) => {
  const { data } = await AXIOS_INSTANCE.get<ApiTypes.TransferHistoryType[]>(
    `${ApiRoutes.TransfersHistory}/${walletAddress}`
  )

  return data
}

export const getTonPrice = async () => {
  let { data } = await axios.get(
    `${HUOBI_API_URL + ApiRoutes.HuobiMarketTonPrice}`
  )

  if (!data.tick) {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    data = await axios.get(`${HUOBI_API_URL + ApiRoutes.HuobiMarketTonPrice}`)
  }

  if (!data.tick) {
    throw new Error('Ton price is not available')
  }

  return data.tick.data[0].price
}

export const getPaginatedListedLots = async (
  tick: string,
  params: {
    count: number
    offset: number
    sort: ApiTypes.LotSort
    direction: ApiTypes.LotSortDirection
  }
) => {
  const { data } =
    await AXIOS_INSTANCE.get<ApiTypes.PaginatedMarketplaceLotsList>(
      `${ApiRoutes.MarketplaceListing}/${tick}`,
      { params: { ...params, filter: 'active' } }
    )

  return data
}

export const getPaginatedMyLots = async (
  tick: string,
  params: {
    count: number
    offset: number
    sort: ApiTypes.LotSort
    direction: ApiTypes.LotSortDirection
    seller: string
  }
) => {
  const { data } =
    await AXIOS_INSTANCE.get<ApiTypes.PaginatedMarketplaceLotsList>(
      `${ApiRoutes.MarketplaceListing}/${tick}`,
      { params: { ...params, filter: 'active' } }
    )

  return data
}

export const getPaginatedActivities = async (
  tick: string,
  params: {
    count: number
    offset: number
    sort: ApiTypes.LotSort
    direction: ApiTypes.LotSortDirection
  }
) => {
  const { data } =
    await AXIOS_INSTANCE.get<ApiTypes.PaginatedMarketplaceLotsList>(
      `${ApiRoutes.MarketplaceListing}/${tick}`,
      { params: { ...params, filter: 'completed' } }
    )

  return data
}

export const getMarketplaceStats = async () => {
  const { data } = await AXIOS_INSTANCE.get<ApiTypes.MarketplaceStats>(
    ApiRoutes.MarketplaceStats
  )

  return data
}

export const getMarketplaceTokenStats = async (params: { tick: string }) => {
  const { data } = await AXIOS_INSTANCE.get<ApiTypes.MarketplaceTokenStats>(
    ApiRoutes.MarketplaceStats,
    { params }
  )

  return data
}

export const getCurrentMaketplaceTicks = async () => {
  const { data } = await AXIOS_INSTANCE.get(ApiRoutes.MaketplaceTicks)

  return data
}
