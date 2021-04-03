import styled, { keyframes } from 'styled-components';
import { Behaviors } from '../../utils/theme';

const spinnerBorder = () => keyframes`
    to {
      transform: rotate(360deg);
    }
`;

export const Container = styled.div`
  border: ${props => props.thickness || 5}px solid ${props => props.color || Behaviors.darkText};
  animation: ${spinnerBorder} 0.75s linear infinite;
  border-right-color: transparent;
  border-radius: 50%;
  width: ${props => props.size || 50}px;
  height: ${props => props.size || 50}px;
`;
