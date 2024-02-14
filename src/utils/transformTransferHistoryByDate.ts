import dayjs from 'dayjs'
import { TransferHistoryType } from 'api/types'

export type TransformedTransfersHistory = {
  date: string
  transfers: TransferHistoryType[]
}

export const transformTransferHistoryByDate = (
  data: TransferHistoryType[]
): TransformedTransfersHistory[] => {
  console.log(data)

  const transformedData: Record<string, any> = {}

  data.forEach((item) => {
    const date = dayjs.unix(item.time).format(' MMMM DD YYYY')

    if (!transformedData[date]) {
      transformedData[date] = []
    }

    transformedData[date].push(item)
  })

  const transformedArray = Object.keys(transformedData).map((date) => ({
    date,
    transfers: transformedData[date],
  }))

  return transformedArray
}
