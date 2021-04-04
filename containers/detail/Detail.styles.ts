import styled from 'styled-components';
import { Behaviors, device, Fonts } from '../../utils/theme';

export const HighLight = styled.div`
  display: flex;
  margin-bottom: 32px;
  width: 100%;

  ${device.mobile} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const HighLightImgContainer = styled.div`
  width: 100%;
  ${device.mobile} {
    margin-bottom: 32px;
    width: 90%;
  }
`;

export const HighLightImg = styled.img`
  width: 100%;
  padding: 8px;
`;

export const InformationsContainer = styled.div`
  margin-left: 32px;
  width: 100%;
  padding: 8px;
  ${device.mobile} {
    margin-left: 0;
  }

  form {
    width: 100%;
  }
`;

export const Name = styled.h2`
  font-family: ${Fonts.fontFamily};
  font-weight: 700;
  font-size: 44px;
  color: ${Behaviors.darkText};
  margin: 0 0 24px 0;
`;

export const Information = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  font-family: ${Fonts.fontFamily};
  font-size: 22px;
  color: ${Behaviors.darkText};
`;

export const Description = styled.article`
  max-width: 100%;
  color: ${Behaviors.darkText};
  display: flex;
  flex-wrap: wrap;
  font-family: ${Fonts.fontFamily};
  line-height: 20px;

  p {
    padding: 8px;
  }

  ul {
    padding: 32px;
  }

  figure {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100% !important;
  }

  img {
    width: 100%;
  }

  ${device.mobile} {
    img {
      width: 320px;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    width: 100%;
    padding: 8px;
  }

  h2 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #bfbfbf;
  }

  h3 {
    box-sizing: border-box;
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 18px;
  }

  h4 {
    font-size: 16px;
    box-sizing: border-box;
    margin-bottom: 16px;
    font-weight: 500;
  }

  figcaption {
    -webkit-text-size-adjust: 100%;
    font-size: 16px;
    box-sizing: border-box;
    outline: 0;
    clear: both;
    display: block;
    font-style: oblique;
    margin: 10px 0;
    text-align: center;
  }
  a {
    font-family: ${Fonts.fontFamily};
    color: ${Behaviors.darkText};
    padding: 0 !important;
  }

  ${device.mobile} {
    table {
      display: none;
    }
  }
`;

export const BackContainer = styled.div`
  padding-left: 8px;
  margin-bottom: 16px;
`;

export const ButtonsContainer = styled.div`
  margin-bottom: 32px;
  width: 100%;
  button:not(:last-child) {
    margin-right: 16px;
  }
`;

export const StyledFabButton = styled.button`
  background-color: transparent;
  border: none;
  outline: 0;
  padding: 0;
  cursor: pointer;
`;

export const ButtonsFormContainer = styled.div`
  display: flex;

  margin-top: 32px;
  button {
    height: 60px;
  }

  button:first-child {
    margin-right: 32px;
  }
`;
