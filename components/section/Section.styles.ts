import styled from 'styled-components';
import { Behaviors, Dimensions } from '../../utils/theme';

export const StyledSection = styled.section`
  min-height: calc(100vh - ${Dimensions.headerHeight});
  background-color: ${Behaviors.darkBackground};
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: ${Dimensions.maxWidth};
  padding: ${Dimensions.defaultPadding} 0;
`;
