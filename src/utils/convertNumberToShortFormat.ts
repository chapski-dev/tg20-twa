export const convertNumberToShortFormat = (number: number): string => {
  const absValue = Math.abs(Number(number))

  switch (true) {
    case absValue >= 1.0e12:
      return (absValue / 1.0e12).toFixed(2).slice(0, -3) + 'MM'
    case absValue >= 1.0e9:
      return (absValue / 1.0e9).toFixed(2).slice(0, -3) + 'B'
    case absValue >= 1.0e6:
      return (absValue / 1.0e6).toFixed(2).slice(0, -3) + 'M'
    case absValue >= 1.0e3:
      return (absValue / 1.0e3).toFixed(2).slice(0, -3) + 'K'
    default:
      return absValue.toString()
  }
}
