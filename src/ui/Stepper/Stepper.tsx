import { FC } from 'react'
import * as S from './style'

type StepperProps = {
  step: number
  totalSteps: number
}

const Stepper: FC<StepperProps> = (props) => {
  const { step, totalSteps } = props

  return (
    <S.Wrapper>
      <S.Label>
        {step + 1} of {totalSteps}
      </S.Label>
      <S.StepperContainer>
        {[...Array(totalSteps)].map((_, index) => (
          <S.Step key={index} isActive={index === step} />
        ))}
      </S.StepperContainer>
    </S.Wrapper>
  )
}

export default Stepper
