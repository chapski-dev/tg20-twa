import { useRoutes } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { Layout } from 'features/Layout/Layout'
import { Home2 } from './Home2/Home2'
import { Inscribe } from './Inscribe/Inscribe'
import { Inscriptions } from './Inscriptions/Inscriptions'
import { Marketplace } from './Marketplace/Marketplace'
import { MyWallet } from './MyWallet/MyWallet'
import { Swap } from './Swap/Swap'
import { Token } from './Token/Token'
import { Deploy } from './Deploy/Deploy'

export const PagesConfig = () => {
  return useRoutes([
    {
      element: <Layout />,
      path: AppRoutes.Home,
      children: [
        {
          element: <Home2 />,
          path: AppRoutes.Home,
        },
        {
          element: <Inscriptions />,
          path: AppRoutes.Inscriptions,
        },
        {
          element: <Inscribe />,
          path: AppRoutes.Inscribe,
        },
        {
          element: <Marketplace />,
          path: AppRoutes.Marketplace,
        },
        {
          element: <Token />,
          path: AppRoutes.Token,
        },
        {
          element: <Swap />,
          path: AppRoutes.Swap,
        },
        {
          element: <Deploy />,
          path: AppRoutes.Deploy
        },
        {
          element: <MyWallet />,
          path: AppRoutes.MyWallet,
        },
        {
          element: <Inscriptions />,
          path: AppRoutes.Inscriptions,
        },
      ],
    },
  ])
}
