import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  width: 100%;
`;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 20px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border-radius: 10px;
  width: 100%;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.bg};
`;

export const ValueLabel = styled.span`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  color: ${({ theme }) => theme.color.text};
`;

export const TokenLabel = styled.span`
  font-weight: 500;
  line-height: 16px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  text-transform: uppercase;
`;

export const TokenWrapper = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

export const PositionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.bgSecondary};
`;

export const PositionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 21px;
`;

export const PositionText = styled.span`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.hint};
`;

export const PositionValue = styled.span`
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  white-space: pre-line;
  text-align: right;
  color: ${({ theme }) => theme.color.hint};
`;

export const PositionTextLabel = styled.span`
  background-color: ${({ theme }) => theme.color.bgSecondary};
  font-size: 12px;
  font-style: normal;
  line-height: 18px;
  font-weight: 400;
  margin: 0;
  padding: 1px 4px;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.hint};
`;

export const For = styled.i`
  color: ${({ theme }) => theme.color.text};
`;
