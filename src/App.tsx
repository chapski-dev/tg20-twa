import { memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { Layout } from 'features/Layout/Layout'
import { Deploy } from 'pages/Deploy/Deploy'
import { Home2 } from 'pages/Home2/Home2'
import { Inscribe } from 'pages/Inscribe/Inscribe'
import { Inscriptions } from 'pages/Inscriptions/Inscriptions'
import { Marketplace } from 'pages/Marketplace/Marketplace'
import { Mint } from 'pages/Mint/Mint'
import { MyWallet } from 'pages/MyWallet/MyWallet'
import { Notifications } from 'pages/Notifications/Notifications'
import { Swap } from 'pages/Swap/Swap'
import { Token } from 'pages/Token/Token'
import { TransferDetailed } from 'pages/TransferDetailed/TransferDetailed'
import { TransferHistory } from 'pages/TransferHistory/TransferHistory'



export const App = memo(() => {
  return (
    <Routes>
      <Route Component={Layout} path={AppRoutes.Home}>
        <Route Component={Home2} index />
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
    </Routes >
  )
})
