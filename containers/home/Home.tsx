import React, { useState } from 'react';
import { useRouter } from 'next/router';
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
import Search from './Search';

const Home = ({
  characters,
  firstLoading,
  error,
  onRefreshRequest,
  favoriteCharacters,
  loadingMore,
  currentPage,
  onMore,
}: HomeProps) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const handleClickCard = character => {
    router.push(`/4005-${character.id}`);
  };

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

  const listOfCharacters: any = filter === 'favorites' ? { results: favoriteCharacters } : characters;
  const numberOfPage =
    (listOfCharacters &&
      listOfCharacters.number_of_total_results &&
      Math.round(listOfCharacters.number_of_total_results / listOfCharacters.limit)) ||
    1;

  const ListCharacters = () => {
    return (
      <>
        {listOfCharacters?.results.length === 0 ? (
          <EmptyStateContainer>We do not found characters by filter</EmptyStateContainer>
        ) : (
          <>
            {listOfCharacters?.results.length > 0 && (
              <AmountCharacters>
                {listOfCharacters?.results.length} characters of{' '}
                {listOfCharacters?.number_of_total_results || listOfCharacters.results.length}
              </AmountCharacters>
            )}
            <CharactersContainer>
              {listOfCharacters?.results?.map(character => (
                <CardCharacter
                  onClick={handleClickCard}
                  className="card-character"
                  key={character.id}
                  character={character}
                />
              ))}
            </CharactersContainer>
            {listOfCharacters && numberOfPage > currentPage && (
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
        />
        <SelectContainer>
          <Select name="filter" options={OptionsFilter} value={filter} onChange={handleChangeFilter} />
        </SelectContainer>
      </FilterContainer>
      {!firstLoading ? (
        <ListCharacters />
      ) : (
        <LoadingContainer>
          <BasicLoading size={48} />
        </LoadingContainer>
      )}
    </Section>
  );
};

export default Home;
