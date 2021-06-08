import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import ArticleCard from "../components/articleCard";

const IndexPage = () => {
  const data: any = useStaticQuery(graphql`
    query {
      allContentfulSitePost(sort: { order: DESC, fields: createdAt }) {
        edges {
          node {
            id
            description {
              description
            }
            slug
            title
            createdAt(locale: "sv_SE")
          }
        }
      }
    }
  `);

  const articles: any = data.allContentfulSitePost.edges;

  return (
    <Layout>
      <Seo title="Home" />
      <section>
        <ul>
          {articles.map(({ node }: any) => (
            <ArticleCard key={node.id} data={node} />
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default IndexPage;
