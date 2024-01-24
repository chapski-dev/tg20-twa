import { useRoutes } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { Layout } from 'features/Layout/Layout'
import { Home } from './Home/Home'
import { Inscribe } from './Inscribe/Inscribe'
import { Marketplace } from './Marketplace/Marketplace'
import { MyWallet } from './MyWallet/MyWallet'
import { Token } from './Token/Token'

export const PagesConfig = () => {
  return useRoutes([
    {
      element: <Layout />,
      path: AppRoutes.Home,
      children: [
        {
          element: <Home />,
          path: AppRoutes.Home,
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
          path: `${AppRoutes.Token}/:id`,
        },
        {
          element: <MyWallet />,
          path: AppRoutes.MyWallet,
        },
      ],
    },
  ])
}
