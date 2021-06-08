import { graphql, useStaticQuery } from 'gatsby';

const useContentFulImage = (imageId: string) => {
  const { allContentfulAsset } = useStaticQuery(graphql`
    query {
      allContentfulAsset {
        edges {
          node {
            contentful_id
            file {
              url
              contentType
            }
          }
        }
      }
    }
  `);
  console.log(allContentfulAsset);
  const imagesArray = allContentfulAsset.edges;
  const searchedImage = imagesArray.filter((imageObj: any) => imageObj.node.contentful_id === imageId);
  console.log(searchedImage);
  return searchedImage[0].node.file.url;
};

export default useContentFulImage;
