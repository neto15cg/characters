import React from 'react';
import Section from '../../components/section/Section';
import { MockResponse } from '../home/Home.data';
import { Description, HighLight, HighLightImg, Information, InformationsContainer, Name } from './Detail.styles';
const Detail = () => {
  const character = MockResponse.results[99];

  return (
    <Section>
      <HighLight>
        <HighLightImg src={character.image.medium_url} />
        <InformationsContainer>
          {!!character.name && <Name>{character.name}</Name>}
          {!!character.gender && <Information>Gender: {character.gender === 1 ? 'Male' : 'Female'}</Information>}
          {!!character.real_name && <Information>Real name: {character.real_name}</Information>}
          {!!character.aliases && (
            <Information>
              Aliases:&nbsp; <div dangerouslySetInnerHTML={{ __html: character.aliases }} />
            </Information>
          )}
          {!!character.birth && <Information>{character.birth}</Information>}
        </InformationsContainer>
      </HighLight>

      {character.description && (
        <Description
          dangerouslySetInnerHTML={{
            __html: character.description.replace(/data-src/g, 'src').replace(/class$/g, 'className'),
          }}
        />
      )}
    </Section>
  );
};

export default Detail;
