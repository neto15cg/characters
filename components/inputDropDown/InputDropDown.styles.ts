import styled, { css, keyframes } from 'styled-components';
import { Behaviors, Dimensions, Fonts } from '../../utils/theme';

export const StyledInput = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 12px 0 12px;
  border: none;
  box-sizing: border-box;
  border-radius: ${Dimensions.defaultBorderRadius};
  font-size: 18px;
  font-style: normal;
  height: 60px;
  font-weight: normal;
  font-family: ${Fonts.fontFamily};
  background-color: ${Behaviors.darkElements};
  color: ${Behaviors.darkText};

  &:focus {
    outline: none;
    box-shadow: ${Behaviors.defaultBoxShadow};
    z-index: 2;
  }

  ${props =>
    props.leftIcon &&
    css`
      padding-left: 53px;
    `}

  ${props =>
    props.error &&
    css`
      border: 1px solid ${Behaviors.errorColor};
      box-sizing: border-box;
      border-radius: 8px;
    `}

  ${props =>
    props.disabled &&
    css`
      background-color: ${Behaviors.disabledBackground};
      cursor: not-allowed;
    `}

    ${props =>
    props.readOnly &&
    css`
      background-color: ${Behaviors.darkBackground};
    `}
`;

export const InputLoadingContainer = styled.div`
  position: absolute;
  top: 24px;
  right: 26px;
`;

export const InputIconContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const InputContainer = styled.div`
  position: relative;
`;

const spinnerBorder = () => keyframes`
    to {
      transform: rotate(360deg);
    }
`;

export const BasicLoading = styled.div`
  border: 3px solid ${Behaviors.darkText};
  animation: ${spinnerBorder} 0.75s linear infinite;
  border-right-color: transparent;
  border-radius: 50%;
  width: 14px;
  height: 14px;
`;

export const DropDown = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 4px;
  max-height: 350px;
  background-color: ${Behaviors.darkElements};
  overflow-y: auto;
  box-shadow: ${Behaviors.defaultBoxShadow};
  border-radius: ${Dimensions.defaultBorderRadius};
  z-index: 2;
`;

export const DropDownContainer = styled.div`
  padding: 20px;
`;

export const StyledOption = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 4px;
  transition: background-color 150ms ease;
  color: ${Behaviors.darkText};
  font-family: ${Fonts.fontFamily};
  font-weight: medium;
  font-size: 18px;

  ${props =>
    props.isClicked &&
    css`
      cursor: pointer;
    `}

  &:hover {
    background-color: #4747470d;
    border-radius: 4px;
  }
  img {
    margin-right: 8px;
  }
`;

export const AllResults = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 4px;
  margin-top: 16px;
  transition: background-color 150ms ease;
  color: ${Behaviors.darkText};
  font-family: ${Fonts.fontFamily};
  font-weight: medium;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #4747470d;
    border-radius: 4px;
  }
`;

export const ButtonClearContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 18px;
  width: 32px;
  height: 32px;
  right: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${Behaviors.darkBackground};
  }
`;

export const EmptyOption = styled.div`
  color: ${Behaviors.darkText};
`;
