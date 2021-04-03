import styled, { keyframes } from 'styled-components';
import { Behaviors } from '../../utils/theme';

const DownFadeIn = keyframes`
    from { 
      opacity: 0.6;
      transform: translateY(-8px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
`;
export const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 4px solid ${Behaviors.darkText};
  margin: 4px;
`;

export const SectionLoadingMore = styled.section`
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Behaviors.darkBackground};

  ${Dot} {
    animation: ${DownFadeIn} 0.5s ease-in-out alternate infinite;

    &:nth-of-type(2) {
      animation-delay: 0.5s;
    }
  }
`;
