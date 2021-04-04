import React, { forwardRef, useRef } from 'react';
import { Behaviors } from '../../utils/theme';
import useClickOutside from '../../utils/useClickOutside';
import { Field, StyledLabel, StyledError } from '../common/Common';
import SvgIcon from '../svgIcon/SvgIcon';
import {
  AllResults,
  BasicLoading,
  ButtonClearContainer,
  DropDown,
  DropDownContainer,
  EmptyOption,
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
    onClickAllResult,
    onFocus,
    onBlur,
    isOpenDropDown,
    onClickOutside,
    value,
  } = props;

  const dropDrownRef = useRef(null);

  useClickOutside(dropDrownRef, () => {
    onClickOutside && onClickOutside();
  });

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

  const hasOptions = options;
  return (
    <Field ref={dropDrownRef}>
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
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
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
      {hasOptions && isOpenDropDown && (
        <DropDown data-testid="drop-down-input">
          <DropDownContainer>
            {options.length > 0 ? (
              <>
                {options.map((option, i) => (
                  <StyledOption
                    data-testid={`drop-down-item-${i}`}
                    onClick={handleClickOption(option)}
                    isClicked={!!onClickOption}
                    key={option.value}>
                    {option.img && <img src={option.img} width="80px" height="80px" alt={option.label} />}
                    {option.label}
                  </StyledOption>
                ))}
                {onClickAllResult && <AllResults onClick={onClickAllResult}>See results</AllResults>}
              </>
            ) : (
              <EmptyOption>Not found characters</EmptyOption>
            )}
          </DropDownContainer>
        </DropDown>
      )}
      {error && <StyledError>{error}</StyledError>}
    </Field>
  );
};

export default forwardRef(InputDropDown);
