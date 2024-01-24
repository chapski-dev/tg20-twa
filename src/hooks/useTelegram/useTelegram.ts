import { useContext } from 'react'
import { TelegramContext } from 'providers/TelegramProvider'

export const useTelegram = () => useContext(TelegramContext)
