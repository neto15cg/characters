import styled from 'styled-components';
import { Behaviors, Dimensions, Fonts } from '../../utils/theme';

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: ${Dimensions.headerHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Behaviors.darkElements};
  box-shadow: ${Behaviors.defaultBoxShadow};
  z-index: 2;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: ${Dimensions.maxWidth};
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  color: ${Behaviors.darkText};
  font-family: ${Fonts.fontFamily};
  font-weight: 700;
`;
