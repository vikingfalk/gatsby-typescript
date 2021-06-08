import React, { ReactNode } from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import{ renderRichText } from "gatsby-source-contentful/rich-text";
import useContentfulImage from '../hooks/useContentfulImage';
import styled from 'styled-components';

interface ArticleProps {
  title: string;
  content: any;
  image: {
    file: {
      url: string;
    };
    title: string;
    description: string;
  };
  createdAt: string;
};

const createHeadingComponent = (size: number, children: ReactNode) => {
  const styles = `
    margin-top: 1rem;
    display: inline-block;
    font-weight: 700;
    margin-bottom: .5rem;
  `
  switch(size) {
    case 2:
      const Heading2 = styled.h2`
        ${styles};
        font-size: 1.5rem;
      `;
      return <Heading2>{children}</Heading2>
    case 3:
      const Heading3 = styled.h3`
        ${styles};
        font-size: 1.2rem;
      `;
      return <Heading3>{children}</Heading3>
    default:
      return <h4>{children}</h4>
  }
}

const Hero = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 1rem;
`;

const H1 = styled.h1`
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: .2rem;
`;

const CreationDate = styled.p`
  color: rgba(0, 0, 0, .6);
  font-style: italic;
  margin-bottom: 2rem;
`;

const Paragraph = styled.p`
  line-height: 1.4rem;
  margin-bottom: 1rem;
`;

const InlineImg = styled.img`
  width: 60%;
  object-fit: cover;
  object-position: center;
  margin-bottom: 1rem;
  float: right;
  padding: 1rem;
`;

const article = (props: { data: { contentfulSitePost: ArticleProps } }) => {
  const post = props.data.contentfulSitePost;

  const Bold = (props: { children: ReactNode }) => <span className="bold">{props.children}</span>
  const Text = (props: { children: ReactNode }) => <Paragraph>{props.children}</Paragraph>
  const Heading = (props: { children: ReactNode, size: number }) => createHeadingComponent(props.size, props.children);

  const options: any = {
    renderMark: {
      [MARKS.BOLD]: (text: string) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => <Text>{children}</Text>,
      [BLOCKS.HEADING_2]: (node: any, children: ReactNode) => <Heading size={2}>{children}</Heading>,
      [BLOCKS.HEADING_3]: (node: any, children: ReactNode) => <Heading size={3}>{children}</Heading>,
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const imageURL = useContentfulImage(node.data.target.sys.id);
        return (
          <>
            <InlineImg className="img-fluid" src={imageURL}/>
          </>
        )
      },
    },
  }

  const mainContent = renderRichText(post.content, options);
  const dateOptions: any = { weekday: "long", year: "numeric", month: "long", day: "2-digit", hour: '2-digit', minute: '2-digit'}

  return (
    <Layout>
      <section>
        <Hero src={post.image.file.url} alt={post.image.description} />
        <H1>{post.title}</H1>
        <CreationDate>{new Date(post.createdAt).toLocaleString('en-GB', dateOptions)}</CreationDate>
        <div>{mainContent}</div>
      </section>
    </Layout>
  );
};

export default article;

export const query = graphql`
  query($slug: String!) {
    contentfulSitePost(slug: { eq: $slug }) {
      content {
        raw
      }
      title
      image {
        file {
          url
        }
        title
        description
      }
      createdAt(locale: "sv-SE")
    }
  }
`;
