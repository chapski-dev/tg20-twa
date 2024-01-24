export const convertNumberToShortFormat = (number: number): string => {
  switch (true) {
    case number < 1000:
      return number.toString()
    case number < 1000000:
      return (number / 1000).toFixed(0) + 'K'
    case number < 1000000000:
      return (number / 1000000).toFixed(1) + 'M'
    default:
      return (number / 1000000000).toFixed(1) + 'B'
  }
}
