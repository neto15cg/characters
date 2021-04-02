import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AxiosStatic } from 'axios';

export const ensureRender = async () => {
  await act(() => Promise.resolve());
};
// eslint-disable-next-line global-require
export const mockAxios: jest.Mocked<AxiosStatic> = require('axios').default;

export const buildSpy = () => jest.fn();

export const noop = () => undefined;
export const { expect } = global as any;
export { userEvent };
