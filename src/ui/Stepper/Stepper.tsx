import { FC, useState } from 'react'
import * as S from './style'

type StepperProps = {
  step: number
  totalSteps: number
}

// for using
//  <Stepper step={0} totalSteps={2} />

const Stepper: FC<StepperProps> = ({ step, totalSteps }) => {
  const [currentStep, setCurrentStep] = useState(step)

  const handleNextStep = () => {
    setCurrentStep((prevStep) =>
      prevStep < totalSteps - 0 ? prevStep + 1 : prevStep
    )
  }
  const resetSteps = () => {
    setCurrentStep(step)
  }

  return (
    <S.StepperContainer>
      {[...Array(totalSteps)].map((_, index) => (
        <S.Step key={index} isActive={index < currentStep} />
      ))}
      <button onClick={handleNextStep}>Next</button>
      <button onClick={resetSteps}>Reset</button>
    </S.StepperContainer>
  )
}

export default Stepper
