import React, { forwardRef } from 'react';
import { Behaviors } from '../../utils/theme';
import { Field, StyledLabel, StyledError } from '../common/Common';
import SvgIcon from '../svgIcon/SvgIcon';
import {
  BasicLoading,
  ButtonClearContainer,
  DropDown,
  DropDownContainer,
  InputContainer,
  InputIconContainer,
  InputLoadingContainer,
  StyledInput,
  StyledOption,
} from './InputDropDown.styles';
import { InputDropDownOption, InputProps } from './InputDropDown.types';

const InputDropDown = (props: InputProps, ref) => {
  const {
    label,
    error,
    id,
    testId,
    type,
    loading,
    options,
    onClickOption,
    onChange,
    onClear,
    leftIcon,
    disabled,
    placeholder,
  } = props;

  const handleClear = () => {
    // @ts-ignore
    document.getElementById('drop-down').value = '';
    if (onChange) {
      // @ts-ignore
      onChange({ target: { value: '' } });
    }
    if (onClear) {
      onClear([]);
    }
  };

  const handleClickOption = (option: InputDropDownOption) => () => onClickOption && onClickOption(option);

  const hasOptions = options && options.length > 0;
  return (
    <Field>
      <StyledLabel htmlFor={id} error={error}>
        {label}
      </StyledLabel>
      <InputContainer>
        {leftIcon && (
          <InputIconContainer>
            <SvgIcon src={leftIcon} width="24px" height="24px" fill={Behaviors.darkText} />
          </InputIconContainer>
        )}
        <StyledInput
          id="drop-down"
          onChange={onChange}
          ref={ref}
          data-testid={testId}
          type={type ?? 'text'}
          disabled={disabled}
          error={error}
          placeholder={placeholder}
        />
        {loading && (
          <InputLoadingContainer>
            <BasicLoading />
          </InputLoadingContainer>
        )}
        {!loading && hasOptions && (
          <ButtonClearContainer onClick={handleClear} data-testid="input-btn-clear">
            <SvgIcon src={'/assets/icons/times-circle.svg'} width="24px" height="24px" fill="#F64E60" />
          </ButtonClearContainer>
        )}
      </InputContainer>
      {hasOptions && (
        <DropDown data-testid="drop-down-input">
          <DropDownContainer>
            {options.map((option, i) => (
              <StyledOption data-testid={`drop-down-item-${i}`} onClick={handleClickOption(option)} key={option.value}>
                {option.img && <img src={option.img} width="80px" height="80px" alt={option.label} />}
                {option.label}
              </StyledOption>
            ))}
          </DropDownContainer>
        </DropDown>
      )}
      {error && <StyledError>{error}</StyledError>}
    </Field>
  );
};

export default forwardRef(InputDropDown);
