import React, { forwardRef } from 'react';
import { Field, StyledLabel, StyledError } from '../common/Common';
import { ArrowSelect, SelectContainer, StyledSelect } from './Select.styles';
import { SelectProps } from './Select.types';

const Select = (props: SelectProps, ref) => {
  const { name, testId, error, onChange, label, options, className, id, value, disabled, onFocus, onBlur } = props;

  const renderOption = option => (
    <option
      key={`${name}-${option.value}`}
      value={option.value}
      className={option.hidden ? 'hide' : ''}
      disabled={option.disabled}>
      {option.label}
    </option>
  );

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: string | number }>) => {
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <Field className={className} data-testid={testId}>
      <StyledLabel htmlFor={id} error={error}>
        {label}
      </StyledLabel>
      <SelectContainer>
        <StyledSelect
          name={name}
          id={id}
          value={value}
          error={error}
          onChange={handleChange}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}>
          {options.map(option => renderOption(option))}
        </StyledSelect>
        {error && <StyledError>{error}</StyledError>}

        <ArrowSelect src={'/assets/icons/angle-down.svg'} width={10} height={10} />
      </SelectContainer>
    </Field>
  );
};

export default forwardRef(Select);
