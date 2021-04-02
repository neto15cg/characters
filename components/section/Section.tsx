import React from 'react';
import { SectionContent, StyledSection } from './Section.styles';

const Section = ({ children }) => {
  return (
    <StyledSection>
      <SectionContent>{children}</SectionContent>
    </StyledSection>
  );
};

export default Section;
