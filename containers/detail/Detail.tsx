import React from 'react';
import BasicLoading from '../../components/basicLoading/BasicLoading';
import Button from '../../components/button/Button';
import { ErrorContainer, ErrorSubTitle, ErrorTitle, LoadingContainer } from '../../components/common/Common';
import Section from '../../components/section/Section';
import SvgIcon from '../../components/svgIcon/SvgIcon';
import { CharacterDetailTypeResponse } from '../../store/ducks/types';
import {
  BackContainer,
  Description,
  HighLight,
  HighLightImg,
  Information,
  InformationsContainer,
  Name,
  StyledFabButton,
} from './Detail.styles';
import { DetailProps } from './Detail.types';

const Detail = ({
  character: characterResponse,
  loading,
  onGoBack,
  error,
  onRefreshRequest,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}: DetailProps) => {
  const character = characterResponse?.results;

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    }
  };

  const handleReloadPage = () => {
    if (onRefreshRequest) {
      onRefreshRequest();
    }
  };

  const handleFavorite = (character: CharacterDetailTypeResponse) => {
    if (!isFavorite && onAddFavorite) {
      return onAddFavorite(character);
    }

    if (isFavorite && onRemoveFavorite) {
      return onRemoveFavorite(character);
    }
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

  if (loading) {
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
      <BackContainer>
        <Button type="button" onClick={handleGoBack}>
          <SvgIcon src={'/assets/icons/arrow-left.svg'} width="20px" height="20px" fill="#fff" />
          Back
        </Button>
      </BackContainer>
      <HighLight>
        <HighLightImg src={character?.image.medium_url} />
        <InformationsContainer>
          {!!character?.name && <Name>{character.name}</Name>}
          {!!character?.gender && <Information>Gender: {character.gender === 1 ? 'Male' : 'Female'}</Information>}
          {!!character?.real_name && <Information>Real name: {character.real_name}</Information>}
          {!!character?.aliases && (
            <Information>
              Aliases:&nbsp; <div dangerouslySetInnerHTML={{ __html: character.aliases }} />
            </Information>
          )}
          {!!character?.birth && <Information>{character.birth}</Information>}
          <StyledFabButton onClick={handleFavorite}>
            <SvgIcon
              src={'/assets/icons/heart.svg'}
              width="32px"
              height="32px"
              fill={isFavorite ? '#FE1111' : '#c3c3c3'}
            />
          </StyledFabButton>
        </InformationsContainer>
      </HighLight>

      {character?.description && (
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
