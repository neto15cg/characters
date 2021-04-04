import styled from 'styled-components';
import { device } from '../../utils/theme';

export const InputContainer = styled.div`
  max-width: 340px;
  width: 100%;
  padding: 0 8px;

  ${device.mobile} {
    max-width: 100%;
  }
`;
