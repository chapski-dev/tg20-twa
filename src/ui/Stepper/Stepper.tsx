import { FC } from 'react'
import * as S from './style'

type StepperProps = {
  step: number
  totalSteps: number
}

const Stepper: FC<StepperProps> = (props) => {
  const { step, totalSteps } = props

  return (
    <S.StepperContainer>
      {[...Array(totalSteps)].map((_, index) => (
        <S.Step key={index} isActive={index < step} />
      ))}
    </S.StepperContainer>
  )
}

export default Stepper
