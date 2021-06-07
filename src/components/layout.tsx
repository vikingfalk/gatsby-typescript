import React, { ReactNode } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { ContentContainer } from "../styles/genericStyles";
import "./layout.css";

import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const data: any = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const siteTitle: string = data.site.siteMetadata?.title || `Title`;

  return (
    <>
      <Header siteTitle={siteTitle} />
      <main>
        <ContentContainer>{children}</ContentContainer>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
