import { useContext } from 'react'
import { ActionsStatusContext } from 'providers/ActionsStatusProvider'

export const useActionsStatusData = () => useContext(ActionsStatusContext)
