import React, { useState } from 'react';
import InputDropDown from '../../components/inputDropDown/InputDropDown';
import Axios from 'axios';
import { CharactersResponse } from '../../store/ducks/types';
import useDebounce from '../../utils/useDebounce';
import { InputContainer } from './Search.styles';
import { SearchProps } from './Search.types';
import { baseURL } from '../../services/api';

const Search = ({ onClickResults, onClear, loading, onClickOption }: SearchProps) => {
  const [predictions, setPredictions] = useState<CharactersResponse>(undefined);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleClearOptions = () => {
    if (onClear) {
      onClear();
    }
    setPredictions(undefined);
    setSearchQuery('');
    setFocused(false);
  };

  const handleClickOption = option => onClickOption && onClickOption(option);

  const handleGetPredictions = async (search: string) => {
    try {
      const url = `${baseURL}characters?limit=${3}&offset=${0}&search=${search}`;
      const response = await Axios.get(url);
      setPredictions(response.data);
      setSearchQuery(search);
    } catch {}
  };

  /**
   * Debounce was used for create a delay between user digitation and request
   * It's necessary for prevent unnecessary request
   */
  const [getLocationsPredictionsDebounce] = useDebounce(async (searchQuery: string) => {
    if (searchQuery.length > 3) {
      setLoadingSearch(true);
      await handleGetPredictions(searchQuery);
      return setLoadingSearch(false);
    }
    handleClearOptions();
  }, 400);

  const handleChangeSearch = (event: React.ChangeEvent<{ name?: string; value: string }>) => {
    const {
      target: { value },
    } = event;
    getLocationsPredictionsDebounce(value);
  };

  const handleSeeResults = () => {
    if (onClickResults) {
      onClickResults(searchQuery);
    }
    setFocused(false);
  };

  const handleFocus = (_: React.ChangeEvent<HTMLInputElement>) => setFocused(true);
  const onClickOutside = () => setFocused(false);

  return (
    <InputContainer>
      <InputDropDown
        type="text"
        name="search"
        leftIcon="assets/icons/search.svg"
        placeholder="Search for a character"
        onChange={handleChangeSearch}
        onClear={handleClearOptions}
        loading={loading || loadingSearch}
        disabled={loading || loadingSearch}
        onFocus={handleFocus}
        onClickOutside={onClickOutside}
        isOpenDropDown={focused}
        options={predictions?.results.map(character => ({
          value: character.id,
          label: character.name,
          img: character.image.icon_url,
        }))}
        onClickAllResult={handleSeeResults}
        onClickOption={handleClickOption}
        testId="input-search"
      />
    </InputContainer>
  );
};

export default Search;
