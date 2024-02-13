import { keyframes, styled } from 'styled-components';
import { SvgClose } from 'ui/icons';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const WrapModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.32);
  transition: height 0.5s ease;
`;

export const CardWrapper = styled.div`
  width: 100%;
  gap: 30px;
  border-radius: 20px 20px 0px 0px;
  padding: 60px 16px 24px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg};
  transition: height 0.3s ease;
  animation: ${fadeIn} 0.3s ease;
  position: relative;
`;

export const Title = styled.h4`
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  color: ${({ theme }) => theme.color.text};
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Description = styled.h4`
  font-weight: 400;
  font-size: 14px;
  line-height: 157%;
  letter-spacing: -0.03em;
  text-align: center;
  color: ${({ theme }) => theme.color.hint};
`;

export const Close = styled(SvgClose)`
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30px;
  height: 30px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: ${({ theme }) => theme.color.text} !important;
  path {
    fill: ${({ theme }) => theme.color.text} !important;
  }
`;
