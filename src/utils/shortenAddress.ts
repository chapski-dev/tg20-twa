export const shortenAddress = (value: string, symbolsCount?: number) => {
  return value.length > 20
    ? `${value.slice(0, symbolsCount || 4)}...${value.slice(
        value.length - (symbolsCount || 4)
      )}`
    : value
}
