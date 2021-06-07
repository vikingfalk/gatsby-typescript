import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { ContentContainer } from "../styles/genericStyles";

interface HeaderProps {
  siteTitle: string;
}

const StyledHeader = styled.header`
  background: grey;
  margin-bottom: 1rem;
`;

const HeaderLink = styled(Link)`
  color: white;
  font-weight: 700;
  text-decoration: none;
`;

const Header = ({ siteTitle = "" }: HeaderProps) => (
  <StyledHeader>
    <ContentContainer>
      <HeaderLink to="/">{siteTitle}</HeaderLink>
    </ContentContainer>
  </StyledHeader>
);

export default Header;
