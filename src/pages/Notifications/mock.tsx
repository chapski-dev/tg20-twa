import { SvgBag2, SvgBing, SvgGift } from 'ui/icons'

type NotificationPropsItems = {
  title: string
  message: string
  time: number
  icon: JSX.Element
}

export const NOTIFICATIONS_ITEMS_MOCK: NotificationPropsItems[] = [
  {
    title: 'New Rewards Unlocked!',
    message: 'Check out page for more info.',
    time: 2,
    icon: <SvgGift />,
  },
  {
    title: 'Welcome Bonus Awaits!',
    message:
      'Get started with your first transaction and unlock exclusive member rewards.',
    time: 2,
    icon: <SvgGift />,
  },
  {
    title: 'System Update Completed',
    message:
      'Your TG20 app is now faster and more secure after our latest update.',
    time: 2,
    icon: <SvgBing />,
  },
  {
    title: 'Marketplace Listing Alert',
    message:
      'A new digital collectible has been listed in your interest category. Dont miss out!',
    time: 2,
    icon: <SvgBag2 />,
  },
  {
    title: 'Transaction Alert',
    message:
      'Your recent transaction of 500 GRAM20 tokens is now confirmed.View transaction details',
    time: 2,
    icon: <SvgBing />,
  },
]
