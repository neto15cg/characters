import styled from 'styled-components';
import { Behaviors, device, Fonts } from '../../utils/theme';

export const InputContainer = styled.div`
  max-width: 340px;
  width: 100%;
  padding: 0 8px;
`;

export const AmountCharacters = styled.p`
  display: flex;
  align-items: center;
  font-family: ${Fonts.fontFamily};
  font-weight: 500;
  font-size: 16px;
  margin-top: 64px;
  color: ${Behaviors.darkText};
  margin: 64px 8px 8px;
`;

export const CharactersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .card-character {
    margin: 8px;
  }
`;

export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const SelectContainer = styled.div`
  max-width: 200px;
  margin: 8px;
  ${device.mobile} {
    width: 100%;
    max-width: 100%;
  }
`;
