import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { buildSpy, ensureRender, mockAxios, userEvent } from '../../../utils/testHelper';
import Search from '../Search';
import { SearchMock } from './fixtures';

describe('Search', () => {
  beforeEach(() => {
    mockAxios.get.mockImplementation(async () => {
      return {
        status: 200,
        data: SearchMock,
        headers: {},
        config: {},
        statusText: 'ok',
      };
    });
  });
  it('should render search', () => {
    render(<Search />);

    expect(screen.getByTestId('input-search')).toBeInTheDocument();
  });

  it('should serach characters and clear input', async () => {
    render(<Search />);

    userEvent.type(screen.getByTestId('input-search'), 'naruto');

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/Flash Thompson/i));
    expect(screen.getByText(/Flashburn/i));
    expect(screen.getByText(/Flashback/i));

    userEvent.clear(screen.getByTestId('input-search'));
    await ensureRender();
    await waitFor(() => expect(screen.queryAllByText(/Flash Thompson/i)).toHaveLength(0));
  });

  it('should call onClickOption when click in one option', async () => {
    const spyOption = buildSpy();
    render(<Search onClickOption={spyOption} />);

    userEvent.type(screen.getByTestId('input-search'), 'naruto');
    await ensureRender();

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    expect(userEvent.click(screen.getByText(/Flash Thompson/i)));

    expect(spyOption).toHaveBeenCalledTimes(1);
  });

  it('should call onClickResults when click in see results', async () => {
    const spyResults = buildSpy();
    render(<Search onClickResults={spyResults} />);

    userEvent.type(screen.getByTestId('input-search'), 'naruto');
    await ensureRender();

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    expect(userEvent.click(screen.getByText(/See results/i)));

    expect(spyResults).toHaveBeenCalledTimes(1);
  });

  it('should clear options when click in clear button', async () => {
    const spyClear = buildSpy();
    render(<Search onClear={spyClear} />);

    userEvent.type(screen.getByTestId('input-search'), 'naruto');
    await ensureRender();

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/Flash Thompson/i));

    userEvent.click(screen.getByTestId('input-btn-clear'));

    expect(screen.queryAllByText(/Flash Thompson/i)).toHaveLength(0);
    expect(spyClear).toHaveBeenCalledTimes(1);
  });
});
