import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Select from '../Select';
import { buildSpy, noop } from '../../../utils/testHelper';

describe('Select', () => {
  const options = [
    {
      label: 'Value1',
      value: 1,
    },
    {
      label: 'Value1',
      value: 2,
    },
  ];

  it('should render the Select', () => {
    const { getByTestId } = render(
      <Select onChange={noop} options={[]} name="selectTest" label="Test label" testId="select" />,
    );
    expect(getByTestId('select')).toBeTruthy();
  });

  it('Should change select value', () => {
    const spyChange = buildSpy();
    const { getByTestId } = render(
      <Select options={options} onChange={spyChange} name="selectTest" label="Test label" testId="select" />,
    );
    const select = getByTestId('select').querySelector('select');
    fireEvent.change(select, {
      target: { value: 2 },
    });

    expect(select.value).toEqual('2');
  });

  it('Should have value passed in props', () => {
    const { getByTestId } = render(
      <Select onChange={noop} options={options} value={1} name="selectTest" label="Test label" testId="select" />,
    );
    const select = getByTestId('select').querySelector('select');

    expect(select.value).toEqual('1');
  });

  it('Should have label passed in props', () => {
    const { getByLabelText } = render(
      <Select
        onChange={noop}
        options={options}
        value={1}
        id="selectTest"
        name="selectTest"
        label="Select Test"
        testId="select"
      />,
    );

    expect(getByLabelText('Select Test')).toBeTruthy();
  });

  it('Should render error text', () => {
    const { getByText } = render(
      <Select
        onChange={noop}
        options={[]}
        error="Select error"
        value="select value"
        name="selectTest"
        label="Test label"
        testId="select"
      />,
    );

    expect(getByText('Select error')).toBeTruthy();
  });

  it('should be select disabled', () => {
    const { getByTestId } = render(
      <Select
        onChange={noop}
        options={[]}
        value="select value"
        name="selectTest"
        label="Test label"
        testId="select"
        disabled
      />,
    );

    const select = getByTestId('select').querySelector('select');

    expect(select.disabled).toBeTruthy();
  });

  it('should call action on change select', () => {
    const spy = buildSpy();

    const { getByTestId } = render(
      <Select options={options} name="selectTest" onChange={spy} label="Test label" testId="select" />,
    );
    const select = getByTestId('select').querySelector('select');

    fireEvent.change(select, { target: { value: '1' } });
    expect(select.value).toBe('1');
    expect(spy).toHaveBeenCalled();
  });

  it('should call action on focus select', () => {
    const spy = buildSpy();
    const { getByTestId } = render(
      <Select onChange={noop} options={options} name="selectTest" onFocus={spy} label="Test label" testId="select" />,
    );
    const select = getByTestId('select').querySelector('select');

    fireEvent.focus(select);
    expect(spy).toHaveBeenCalled();
  });

  it('should call action on blur select', () => {
    const spy = buildSpy();
    const { getByTestId } = render(
      <Select onChange={noop} options={options} name="selectTest" onBlur={spy} label="Test label" testId="select" />,
    );
    const select = getByTestId('select').querySelector('select');

    fireEvent.blur(select);
    expect(spy).toHaveBeenCalled();
  });
});
