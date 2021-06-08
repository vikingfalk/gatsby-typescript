import React, { ReactNode } from "react";
import Layout from "../components/layout";
import { graphql, useStaticQuery } from "gatsby";
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import{ renderRichText } from "gatsby-source-contentful/rich-text";
import useContentfulImage from '../hooks/useContentfulImage';

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
}

const article = (props: { data: { contentfulSitePost: ArticleProps } }) => {
  const post = props.data.contentfulSitePost;

  const Bold = (props: { children: ReactNode }) => <span className="bold">{props.children}</span>
  const Text = (props: { children: ReactNode }) => <p className="align-center">{props.children}</p>
  const Heading = (props: { children: ReactNode }) => <h3>{props.children}</h3>

  const options: any = {
    renderMark: {
      [MARKS.BOLD]: (text: string) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => <Text>{children}</Text>,
      [BLOCKS.HEADING_1]: (node: any, children: ReactNode) => <Heading>{children}</Heading>,
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        console.log(node);
        const imageURL = useContentfulImage(node.data.target.sys.id);
        console.log('returned image url: ', imageURL);
        return (
          <>
            <img className="img-fluid" src={imageURL}/>
          </>
        )
      },
    },
  }

  const mainContent = renderRichText(post.content, options);
  console.log(mainContent);
  console.log(post.content)

  return (
    <Layout>
      <section>
        <h1>{post.title}</h1>
        <p>{post.createdAt}</p>
        <img src={post.image.file.url} alt={post.image.description} />
        <div>{mainContent}</div>
        <div>{post.content.raw}</div>
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
