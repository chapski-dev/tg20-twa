import { AppRoutes } from 'constants/app'
import {
  SvgArrowSwapHorizontal,
  SvgBag,
  SvgLevel,
  SvgHome,
  SvgWallet2,
} from 'ui/icons'

export const navigations = [
  {
    text: 'Home',
    to: AppRoutes.Home,
    Logo: SvgHome,
  },
  {
    text: 'Inscriptions',
    to: AppRoutes.Inscriptions,
    Logo: SvgLevel,
  },
  {
    text: 'Marketplace',
    to: AppRoutes.Marketplace,
    Logo: SvgBag,
  },
  {
    text: 'Swap',
    to: `/swap`,
    Logo: SvgArrowSwapHorizontal,
  },
  {
    text: 'Wallet',
    to: AppRoutes.MyWallet,
    Logo: SvgWallet2,
  },
]
