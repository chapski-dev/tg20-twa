const alphabetColors: { [key: string]: string } = {
  A: '#0057FF',
  B: '#0075FF',
  C: '#008DFF',
  D: '#00A5FF',
  E: '#00BCFF',
  F: '#00D4FF',
  G: '#00EBFF',
  H: '#00FFEE',
  I: '#00FFD6',
  J: '#00FFBD',
  K: '#00FFA5',
  L: '#00FF8D',
  M: '#00FF74',
  N: '#00FF5C',
  O: '#00FF44',
  P: '#00FF2C',
  Q: '#00FF13',
  R: '#0CFF00',
  S: '#24FF00',
  T: '#3CFF00',
  U: '#54FF00',
  V: '#6BFF00',
  W: '#83FF00',
  X: '#9BFF00',
  Y: '#B2FF00',
  Z: '#CAFF00',
}

export const generateTickLogoGradient = (tick: string): string => {
  const colors = tick
    .toUpperCase()
    .split('')
    .map((letter) => alphabetColors[letter] || '#0057FF')

  return `linear-gradient(to bottom right, ${colors.join(', ')})`
}
