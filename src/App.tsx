import { memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import {
  Home,
  Token,
  TransferDetailed,
  TransferHistory,
  Marketplace,
  Deploy,
  Inscribe,
  Inscriptions,
  MyWallet,
  Notifications,
  Swap,
  Mint
} from 'pages'
import { Layout } from 'ui'

export const App = memo(() => {
  return (
    <Routes>
      <Route Component={Layout} path={AppRoutes.Home}>
        <Route Component={Home} index />
        <Route Component={Inscriptions} path={AppRoutes.Inscriptions} />
        <Route Component={Deploy} path={AppRoutes.Deploy} />
        <Route Component={Token} path={AppRoutes.Token} />
        <Route Component={Mint} path={AppRoutes.Mint} />
        <Route Component={Inscribe} path={AppRoutes.Inscribe} />
        <Route Component={Marketplace} path={AppRoutes.Marketplace} />
        <Route Component={Swap} path={AppRoutes.Swap} />
        <Route Component={MyWallet} path={AppRoutes.MyWallet} />
        <Route Component={Notifications} path={AppRoutes.Notifications} />
        <Route Component={TransferHistory} path={AppRoutes.TransferHistory} />
        <Route Component={TransferDetailed} path={AppRoutes.TransferDetailed} />
      </Route>
    </Routes>
  )
})
