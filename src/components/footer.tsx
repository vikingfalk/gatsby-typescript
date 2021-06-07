import React from "react";
import styled from "styled-components";

const FooterComponent = styled.footer`
  background-color: grey;
  padding: 1rem;
  text-align: center;
  color: white;
  a {
    color: white;
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <>
      <FooterComponent>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </FooterComponent>
    </>
  );
};

export default Footer;
