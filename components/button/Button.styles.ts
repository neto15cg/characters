import styled, { keyframes } from 'styled-components';
import { darken, lighten } from 'polished';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 30px;
  width: 100%;
  background-position: center;
  color: #ffffff;
  font-weight: 600;
  line-height: 20px;
  border: none;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 250ms, background-color 250ms ease-in-out;
  background-color: ${lighten(0.005, '#464646')};
  font-family: 'Poppins', sans-serif;

  &:hover {
    background: ${darken(0.005, '#464646')} radial-gradient(circle, transparent 1%, ${darken(0.005, '#464646')} 1%) center/15000%;
  }

  &:active {
    background-color: ${lighten(0.05, '#464646')};
    background-size: 100%;
    transition: background 0s;
  }

  &&:disabled {
    background: #b5b7ba;
    border-color: #b5b7ba;
    cursor: initial;
    box-shadow: none;

    span {
      color: #556070;
    }
  }
`;

const spinnerBorder = () => keyframes`
    to {
      transform: rotate(360deg);
    }
`;

export const ButtonContainerLoading = styled.div`
  position: absolute;
`;

export const BasicLoading = styled.div`
  border: 4px solid #fff;
  animation: ${spinnerBorder} 0.75s linear infinite;
  border-right-color: transparent;
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;
