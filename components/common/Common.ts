import styled from 'styled-components';
import { Behaviors, Fonts } from '../../utils/theme';

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-family: ${Fonts.fontFamily};
  font-size: 10px;
  color: ${Behaviors.darkText};
  padding-left: 12px;
  margin-bottom: 8px;
`;

export const Field = styled.div`
  max-width: 100%;
  position: relative;
`;

export const StyledError = styled.span`
  display: flex;
  align-items: center;
  font-family: ${Fonts.fontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  color: ${Behaviors.errorColor};
  padding-left: 12px;
  margin-top: 8px;
`;
