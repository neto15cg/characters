import React from 'react';
import { CardContainer, CardTitle } from './CardProduct.styles';
import { CardCharacterProps } from './CardProduct.types';

const CardProduct = ({ character, className, testId, onClick }: CardCharacterProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(character);
    }
  };

  return (
    <CardContainer className={className} data-testid={testId} onClick={handleClick}>
      {character?.image?.icon_url && (
        <img alt={character?.name} src={character?.image?.thumb_url} width="150px" height="160px" loading="lazy" />
      )}
      <CardTitle>{character?.name}</CardTitle>
    </CardContainer>
  );
};

export default CardProduct;
