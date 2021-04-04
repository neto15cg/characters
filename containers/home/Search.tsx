import React, { useState } from 'react';
import InputDropDown from '../../components/inputDropDown/InputDropDown';
import api from '../../services/api';
import { CharactersResponse } from '../../store/ducks/types';
import useDebounce from '../../utils/useDebounce';
import { InputContainer } from './Home.styles';
import { SearchProps } from './Home.types';

const Search = ({ onClickResults, onClear, loading, onClickOption }: SearchProps) => {
  const [predictions, setPredictions] = useState<CharactersResponse>(undefined);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleClearOptions = () => {
    setPredictions(undefined);
    setSearchQuery('');
    onClear();
    setFocused(false);
  };

  const handleClickOption = option => onClickOption(option);

  const handleGetPredictions = async (search: string) => {
    try {
      const url = `characters?limit=${3}&offset=${0}&search=${search}`;
      const response = await api.get(url);
      setPredictions(response.data);
      setSearchQuery(search);
    } catch (e) {}
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
    onClickResults(searchQuery);
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
      />
    </InputContainer>
  );
};

export default Search;
