import Link from 'next/link';
import React from 'react';
import { HeaderContent, HeaderTitle, StyledHeader } from './Header.styles';

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContent>
        <HeaderTitle>
          <Link href="/">CHARACTERS</Link>
        </HeaderTitle>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
