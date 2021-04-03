import React, { useState } from 'react';
import { useRouter } from 'next/router';
import BasicLoading from '../../components/basicLoading/BasicLoading';
import CardCharacter from '../../components/cardCharacter/CardCharacter';
import { ErrorContainer, ErrorSubTitle, ErrorTitle, LoadingContainer } from '../../components/common/Common';
import InputDropDown from '../../components/inputDropDown/InputDropDown';
import { InputDropDownOption } from '../../components/inputDropDown/InputDropDown.types';
import Section from '../../components/section/Section';
import Select from '../../components/select/Select';
import { OptionsFilter } from './Home.data';
import {
  AmountCharacters,
  CharactersContainer,
  EmptyStateContainer,
  FilterContainer,
  InputContainer,
  SelectContainer,
} from './Home.styles';
import { HomeProps } from './Home.types';
import { LoadMore } from '../../components/loadingMore/LoadingMore';

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

  const router = useRouter();
  const handleClickOption = (option: InputDropDownOption) => {
    console.log(option);
  };

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

  const handleMoreCharacters = (page: number) => {
    if (onMore) {
      onMore(page);
    }
  };

  const listOfCharacters: any = filter === 'favorites' ? { results: favoriteCharacters } : characters;
  const numberOfPage =
    (listOfCharacters &&
      listOfCharacters.number_of_total_results &&
      Math.round(listOfCharacters.number_of_total_results / listOfCharacters.limit)) ||
    1;

  console.log(listOfCharacters);

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

  if (firstLoading) {
    return (
      <Section>
        <LoadingContainer>
          <BasicLoading size={48} />
        </LoadingContainer>
      </Section>
    );
  }

  return (
    <Section>
      <FilterContainer>
        <InputContainer>
          <InputDropDown
            type="text"
            name="search"
            leftIcon="assets/icons/search.svg"
            placeholder="Search for a character"
            onClickOption={handleClickOption}
            // options={[
            //   {
            //     label: 'Dream girl',
            //     value: '12312312',
            //     img: 'https://comicvine1.cbsistatic.com/uploads/square_avatar/1/15776/891174-pi.jpg',
            //   },
            //   {
            //     label: 'Dream girl',
            //     value: '123123122',
            //     img: 'https://comicvine1.cbsistatic.com/uploads/square_avatar/1/15776/891174-pi.jpg',
            //   },
            //   {
            //     label: 'Dream girl',
            //     value: '123122312',
            //     img: 'https://comicvine1.cbsistatic.com/uploads/square_avatar/1/15776/891174-pi.jpg',
            //   },
            // ]}
          />
        </InputContainer>
        <SelectContainer>
          <Select name="filter" options={OptionsFilter} value={filter} onChange={handleChangeFilter} />
        </SelectContainer>
      </FilterContainer>
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
          {characters && numberOfPage > currentPage && (
            <LoadMore isFetching={loadingMore} page={currentPage} callback={handleMoreCharacters} />
          )}
        </>
      )}
    </Section>
  );
};

export default Home;
