import styled, { css } from 'styled-components';
import { Behaviors, Dimensions } from '../../utils/theme';
import SvgIcon from '../svgIcon/SvgIcon';

export const SelectContainer = styled.div`
  position: relative;
`;

export const StyledSelect = styled.select`
  height: 60px;
  width: 100%;
  min-width: 150px;
  background-color: ${Behaviors.darkElements};
  border: none;
  padding: 0 22px;
  border-radius: ${Dimensions.defaultBorderRadius};
  color: ${Behaviors.darkText};
  font-size: 18px;
  font-weight: 500;
  outline: none;
  appearance: none;

  option.hide {
    display: none;
  }

  option:disabled {
    color: ${Behaviors.disabledBackground};
  }

  &:focus {
    outline: none;
    box-shadow: ${Behaviors.defaultBoxShadow};
    z-index: 2;
  }

  ${props =>
    props.error &&
    css`
      border: 1px solid ${Behaviors.errorColor};
      box-sizing: border-box;
    `}

  ${props =>
    props.disabled &&
    css`
      background-color: ${Behaviors.disabledBackground};
      cursor: not-allowed;
    `}
`;

export const ArrowSelect = styled(SvgIcon)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  right: 22px;
  pointer-events: none;
  fill: ${Behaviors.darkText};
`;
