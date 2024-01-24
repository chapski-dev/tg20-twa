import { TonClient, Address, fromNano } from '@ton/ton'
import { TON_CLIENT_URL } from 'constants/api'

export async function getBalance(walletAddress: string) {
  const balance = await new TonClient({
    endpoint: TON_CLIENT_URL,
  }).getBalance(Address.parse(walletAddress))

  return Number(fromNano(balance))
}
