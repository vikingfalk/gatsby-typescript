import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";

interface ArticleProps {
  title: string;
  content: {
    raw: string;
  };
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
  return (
    <Layout>
      <section>
        <h1>{post.title}</h1>
        <p>{post.createdAt}</p>
        <img src={post.image.file.url} alt={post.image.description} />
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
