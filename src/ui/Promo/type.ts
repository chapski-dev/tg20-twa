export type ThemeVariants = 'purple' | 'yellow' | 'blue'

export type Theme = { variant: ThemeVariants }

export type PromoProps = {
  title: string
  subtitle: string
  className?: string
  onClose?: () => void
} & Theme
