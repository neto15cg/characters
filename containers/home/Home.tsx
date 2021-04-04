import React, { useState } from 'react';
import BasicLoading from '../../components/basicLoading/BasicLoading';
import CardCharacter from '../../components/cardCharacter/CardCharacter';
import { ErrorContainer, ErrorSubTitle, ErrorTitle, LoadingContainer } from '../../components/common/Common';
import Section from '../../components/section/Section';
import Select from '../../components/select/Select';
import { OptionsFilter } from './Home.data';
import {
  AmountCharacters,
  CharactersContainer,
  EmptyStateContainer,
  FilterContainer,
  SelectContainer,
} from './Home.styles';
import { HomeProps } from './Home.types';
import { LoadMore } from '../../components/loadingMore/LoadingMore';
import Search from '../search/Search';

const Home = ({
  characters,
  firstLoading,
  error,
  onRefreshRequest,
  favoriteCharacters,
  loadingMore,
  currentPage,
  onMore,
  editedCharacters,
  onNavigateToDetail,
}: HomeProps) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleClickCard = (id: number) => onNavigateToDetail(id);

  const handleReloadPage = () => {
    if (onRefreshRequest) {
      onRefreshRequest();
    }
  };

  const handleChangeFilter = (event: React.ChangeEvent<{ name?: string; value: string }>) => {
    setFilter(event?.target?.value || 'all');
  };

  const handleMoreCharacters = (page: number, search?: string) => {
    if (onMore) {
      onMore(page, search ?? searchQuery);
    }
  };

  const handleClickResultsSearch = (search: string) => {
    setSearchQuery(search);
    handleMoreCharacters(1, search);
  };

  const handleClearSearch = () => {
    if (searchQuery) {
      handleMoreCharacters(1, '');
      setSearchQuery('');
    }
  };

  const ListCharacters = () => {
    const listOfCharacters: any = filter === 'favorites' ? { results: favoriteCharacters } : characters;
    const numberOfPage =
      (listOfCharacters &&
        listOfCharacters.number_of_total_results &&
        Math.round(listOfCharacters.number_of_total_results / listOfCharacters.limit)) ||
      1;

    const mergedResults = listOfCharacters?.results.map(character => {
      const findEdited = editedCharacters.find(editedCharacter => editedCharacter.id === character.id);
      if (!findEdited) {
        return character;
      }
      return { ...character, ...findEdited };
    });

    const listToRender = { ...listOfCharacters, results: mergedResults || [] };
    return (
      <>
        {listToRender?.results.length === 0 ? (
          <EmptyStateContainer>We do not found characters by filter</EmptyStateContainer>
        ) : (
          <>
            {listToRender?.results.length > 0 && (
              <AmountCharacters>
                {listToRender?.results.length} characters of{' '}
                {listToRender?.number_of_total_results || listToRender.results.length}
              </AmountCharacters>
            )}
            <CharactersContainer>
              {listToRender?.results?.map(character => (
                <CardCharacter
                  onClick={() => handleClickCard(character.id)}
                  className="card-character"
                  key={character.id}
                  character={character}
                />
              ))}
            </CharactersContainer>
            {listToRender && numberOfPage > currentPage && (
              <LoadMore isFetching={loadingMore} page={currentPage} callback={handleMoreCharacters} />
            )}
          </>
        )}
      </>
    );
  };

  if (error) {
    return (
      <Section>
        <ErrorContainer>
          <ErrorTitle>Sorry, we have a problem!</ErrorTitle>
          <ErrorSubTitle onClick={handleReloadPage}>Click here to refresh request :)</ErrorSubTitle>
        </ErrorContainer>
      </Section>
    );
  }

  return (
    <Section>
      <FilterContainer>
        <Search
          onClickResults={handleClickResultsSearch}
          onClear={handleClearSearch}
          loading={loadingMore || firstLoading}
          onClickOption={option => handleClickCard(option.value)}
        />
        <SelectContainer>
          <Select name="filter" options={OptionsFilter} value={filter} onChange={handleChangeFilter} />
        </SelectContainer>
      </FilterContainer>
      {!firstLoading ? (
        <>{ListCharacters()}</>
      ) : (
        <LoadingContainer>
          <BasicLoading size={48} />
        </LoadingContainer>
      )}
    </Section>
  );
};

export default Home;
