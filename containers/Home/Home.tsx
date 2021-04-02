import React from 'react';
import CardProduct from '../../components/cardCharacter/CardCharacter';
import InputDropDown from '../../components/inputDropDown/InputDropDown';
import { InputDropDownOption } from '../../components/inputDropDown/InputDropDown.types';
import Section from '../../components/section/Section';
import Select from '../../components/select/Select';
import { MockResponse, OptionsFilter } from './Home.data';
import { AmountCharacters, CharactersContainer, FilterContainer, InputContainer, SelectContainer } from './Home.styles';

const Home = () => {
  const handleClickOption = (option: InputDropDownOption) => {
    console.log(option);
  };

  const handleClickCard = character => {
    console.log(character);
  };
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
      <AmountCharacters>1200 charcters</AmountCharacters>
      <CharactersContainer>
        {MockResponse.results.map(character => (
          <CardProduct onClick={handleClickCard} className="card-character" key={character.id} character={character} />
        ))}
      </CharactersContainer>
    </Section>
  );
};

export default Home;
