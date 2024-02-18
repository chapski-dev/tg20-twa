import { FC } from 'react'
import { ImageInput } from 'features/FormFields'
import * as S from './style'

export const DeployStep2: FC = () => {
  return (
    <S.Wrapper>
      <ImageInput label="Upload token logo" name="file" />
    </S.Wrapper>
  )
}
