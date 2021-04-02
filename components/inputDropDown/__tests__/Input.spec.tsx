import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { buildSpy, userEvent } from '../../../utils/testHelper';

import InputDropDown from '../InputDropDown';

describe('Input', () => {
  it('should render the InputDropdown', () => {
    render(<InputDropDown name="inputTest" label="Test label" testId="input" type="text" />);
    expect(screen.getByTestId('input')).toBeTruthy();
  });

  it('Should change input value on type', async () => {
    render(<InputDropDown name="inputTest" label="Test label" testId="input" type="text" />);

    userEvent.type(screen.getByRole('textbox'), 'new Value');
    expect(screen.getByRole('textbox')).toHaveValue('new Value');
  });

  it('Should have value passed in props', () => {
    render(<InputDropDown value="input value" name="inputTest" type="text" label="Test label" testId="input" />);

    expect(screen.getByRole('textbox')).toHaveValue('input value');
  });

  it('Should have label passed in props', () => {
    render(<InputDropDown value="input value" name="inputTest" type="text" label="Test label" testId="input" id="inputTestlabel" />);

    expect(screen.getByText(/Test label/i)).toBeInTheDocument();
  });

  it('Should render error text', () => {
    render(<InputDropDown error="Input error" value="input value" type="text" name="inputTest" label="Test label" testId="input" />);

    expect(screen.getByText(/Input error/i));
  });

  it('should call action on change input', () => {
    const spy = buildSpy();

    render(<InputDropDown name="inputTest" onChange={spy} type="text" label="Test label" testId="input" />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'challenge-login' } });
    // @ts-ignore
    expect(input.value).toBe('challenge-login');
    expect(spy).toHaveBeenCalled();
  });

  it('should call action on blur input', () => {
    const spy = buildSpy();
    render(<InputDropDown name="inputTest" onBlur={spy} type="text" label="Test label" testId="input" />);
    const input = screen.getByRole('textbox');

    fireEvent.blur(input);
    expect(spy).toHaveBeenCalled();
  });

  it('should render drop down if has options', () => {
    render(
      <InputDropDown
        name="inputTest"
        testId="input"
        type="text"
        options={[
          { label: 'Label 1', value: 'value 1' },
          { label: 'Label 2', value: 'value 2' },
        ]}
      />,
    );

    expect(screen.getByText(/Label 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Label 2/i)).toBeInTheDocument();
  });

  it('should call onClickOption  if click dropDown option', () => {
    const spyOption = buildSpy();
    render(
      <InputDropDown
        name="inputTest"
        testId="input"
        type="text"
        options={[
          { label: 'Label 1', value: 'value 1' },
          { label: 'Label 2', value: 'value 2' },
        ]}
        onClickOption={spyOption}
      />,
    );

    userEvent.click(screen.getByText(/Label 1/i));
    expect(spyOption).toHaveBeenCalledWith({ label: 'Label 1', value: 'value 1' });
  });

  it('should call onClear and onCahnge if has options', () => {
    const spyOnChange = buildSpy();
    const spyOnClear = buildSpy();
    render(
      <InputDropDown
        onChange={spyOnChange}
        onClear={spyOnClear}
        name="inputTest"
        testId="input"
        type="text"
        options={[
          { label: 'Label 1', value: 'value 1' },
          { label: 'Label 2', value: 'value 2' },
        ]}
      />,
    );

    userEvent.click(screen.getByTestId('input-btn-clear'));

    expect(spyOnChange).toHaveBeenCalledTimes(1);
    expect(spyOnClear).toHaveBeenCalledTimes(1);
  });
});
