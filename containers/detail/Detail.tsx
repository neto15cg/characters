import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BasicLoading from '../../components/basicLoading/BasicLoading';
import Button from '../../components/button/Button';
import { ErrorContainer, ErrorSubTitle, ErrorTitle, LoadingContainer } from '../../components/common/Common';
import InputDropDown from '../../components/inputDropDown/InputDropDown';
import Section from '../../components/section/Section';
import Select from '../../components/select/Select';
import SvgIcon from '../../components/svgIcon/SvgIcon';
import { CharacterDetailTypeResponse } from '../../store/ducks/types';
import { OptionsFilter, renderGender } from './Detail.data';
import {
  BackContainer,
  ButtonsContainer,
  ButtonsFormContainer,
  Description,
  HighLight,
  HighLightImg,
  HighLightImgContainer,
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
  onSaveEdit,
}: DetailProps) => {
  const character = characterResponse?.results;
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    const updateCharacter = { ...character, ...data, gender: Number(data.gender) };
    onSaveEdit(updateCharacter);
    setIsEditing(false);
  };

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

  const handleEdit = () => setIsEditing(true);

  const handleCancelEdit = () => setIsEditing(false);

  useEffect(() => {
    if (character) {
      reset({
        name: character.name || '',
        aliases: character.aliases || '',
        gender: character.gender || 0,
        real_name: character.real_name || '',
        birth: character.birth || '',
      });
    }
  }, [character]);

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
        <HighLightImgContainer>
          <HighLightImg src={character?.image.medium_url} />
        </HighLightImgContainer>
        <InformationsContainer>
          <ButtonsContainer>
            <StyledFabButton onClick={handleFavorite}>
              <SvgIcon
                src={'/assets/icons/heart.svg'}
                width="32px"
                height="32px"
                fill={isFavorite ? '#FE1111' : '#c3c3c3'}
              />
            </StyledFabButton>
            {!isEditing && (
              <StyledFabButton onClick={handleEdit}>
                <SvgIcon src={'/assets/icons/edit.svg'} width="32px" height="32px" fill={'#6563ff'} />
              </StyledFabButton>
            )}
          </ButtonsContainer>

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputDropDown type="text" name="name" label="Name" ref={register} />
              <br />
              <Select name="gender" label="Aliases" options={OptionsFilter} ref={register} />
              <br />
              <InputDropDown type="text" name="real_name" label="Real name" ref={register} />
              <br />
              <InputDropDown type="text" name="aliases" label="Aliases" ref={register} />
              <br />
              <InputDropDown type="text" name="birth" label="Birth" ref={register} />
              <br />
              <ButtonsFormContainer>
                <Button type="submit">Save</Button>
                <Button type="submit" color="#FE1111" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </ButtonsFormContainer>
            </form>
          ) : (
            <>
              {!!character?.name && <Name>{character.name}</Name>}
              {character?.gender > -1 && <Information>Gender: {renderGender(character.gender)}</Information>}
              {!!character?.real_name && <Information>Real name: {character.real_name}</Information>}
              {!!character?.aliases && (
                <Information>
                  Aliases:&nbsp; <div dangerouslySetInnerHTML={{ __html: character.aliases }} />
                </Information>
              )}
              {!!character?.birth && <Information>Birth: {character.birth}</Information>}
            </>
          )}
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
