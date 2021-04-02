import styled from 'styled-components';
import { Behaviors, device, Fonts } from '../../utils/theme';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 151px;
  height: 230px;
  background-color: ${Behaviors.darkElements};
  cursor: pointer;
  border-radius: 5px;

  ${device.mobile} {
    width: 100%;
  }

  img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    ${device.mobile} {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-family: ${Fonts.fontFamily};
  font-weight: 500;
  font-size: 18px;
  text-align: center;

  color: ${Behaviors.darkText};
`;
