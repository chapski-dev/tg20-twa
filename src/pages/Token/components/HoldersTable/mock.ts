export const generateHoldersMock = () => {
  const holdersMock = []

  for (let i = 0; i < 36; i++) {
    holdersMock.push({
      id: i + 1,
      wallet: 'UQDmz...llePm',
      percent: '4.35',
      value: '6,731,000',
    })
  }

  return holdersMock
}
