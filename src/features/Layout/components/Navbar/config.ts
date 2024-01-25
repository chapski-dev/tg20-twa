import { AppRoutes } from 'constants/app';
import SwapIcon from 'ui/icons/ArrowSwapHorizontal';
import MarketPlace from 'ui/icons/Bag';
import Home from 'ui/icons/Home';
import Inscriptions from 'ui/icons/Level';
import Wallet from 'ui/icons/Wallet2';

export const navigations = [
    {
        text: 'Home',
        to: AppRoutes.Home,
        logo: Home,
    },
    {
        text: 'Inscriptions',
        to: AppRoutes.Inscribe,
        logo: Inscriptions,
    },
    {
        text: 'Marketplace',
        to: AppRoutes.Marketplace,
        logo: MarketPlace,
    },
    {
        text: 'Swap',
        to: AppRoutes.Token,
        logo: SwapIcon,
    },
    {
        text: 'Wallet',
        to: AppRoutes.MyWallet,
        logo: Wallet,
    }
];