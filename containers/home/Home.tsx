import { useRouter } from 'next/router';
import React from 'react';
import BasicLoading from '../../components/basicLoading/BasicLoading';
import CardCharacter from '../../components/cardCharacter/CardCharacter';
import InputDropDown from '../../components/inputDropDown/InputDropDown';
import { InputDropDownOption } from '../../components/inputDropDown/InputDropDown.types';
import Section from '../../components/section/Section';
import Select from '../../components/select/Select';
import { OptionsFilter } from './Home.data';
import {
  AmountCharacters,
  CharactersContainer,
  FilterContainer,
  InputContainer,
  LoadingContainer,
  SelectContainer,
} from './Home.styles';
import { HomeProps } from './Home.types';

const Home = ({ characters, firstLoading }: HomeProps) => {
  const router = useRouter();

  const handleClickOption = (option: InputDropDownOption) => {
    console.log(option);
  };

  const handleClickCard = character => {
    router.push(`/4005-${character.id}`);
  };

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
          <Select name="filter" options={OptionsFilter} />
        </SelectContainer>
      </FilterContainer>
      {characters && <AmountCharacters>{characters.results.length} characters</AmountCharacters>}
      <CharactersContainer>
        {characters?.results?.map(character => (
          <CardCharacter
            onClick={handleClickCard}
            className="card-character"
            key={character.id}
            character={character}
          />
        ))}
      </CharactersContainer>
    </Section>
  );
};

export default Home;
