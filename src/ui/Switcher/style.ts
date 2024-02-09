import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Title = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.color.text}
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
export const ToggleContainer = styled.label`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: fit-content;
  border-radius: 5px;
  background: ${({ theme }) => theme.color.bg};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.hint};
  cursor: pointer;
  &:before {
    content: '';
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0%;
    border-radius: 5px;
    background: ${({ theme }) => theme.color.btn};
    transition: all 0.3s;
  }
  div {
    padding: 3px 8px;
    text-align: center;
    z-index: 1;
  }
`
export const Input = styled.input`
  display: none;

  &:checked + ${ToggleContainer}:before {
    left: 50%;
  }
  &:checked + ${ToggleContainer} div:first-child {
    color: ${({ theme }) => theme.color.hint};
    transition: color 0.3s;
  }
  &:checked + ${ToggleContainer} div:last-child {
    color: ${({ theme }) => theme.color.btnText};
    transition: color 0.3s;
  }
  & + ${ToggleContainer} div:first-child {
    color: ${({ theme }) => theme.color.btnText};
    transition: color 0.3s;
  }
  & + ${ToggleContainer} div:last-child {
    color: ${({ theme }) => theme.color.hint};
    transition: color 0.3s;
  }
`
