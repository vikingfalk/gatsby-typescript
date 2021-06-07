import React from "react";
import styled from "styled-components";

interface ArticleCardProps {
  id: string;
  title: string;
  description: { description: string };
  createdAt: string;
  slug: string;
}

const Card = styled.li`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const ButtonComponent = styled.button`
  padding: 0.5rem 1rem;
  background-color: lightgray;
  border-radius: 0.5rem;
  justify-self: right;
  &:hover {
    background-color: gray;
    color: white;
    transition: all 0.2s;
  }
`;

const articleCard = (props: { data: ArticleCardProps }) => {
  const { data } = props;

  return (
    <>
      <Card>
        <CardContent>
          <h2>{data.title}</h2>
          <p>{data.description.description}</p>
        </CardContent>
        <p>{`${new Date(data.createdAt).toLocaleString("sv-SE")}`}</p>
        <ButtonComponent>See article</ButtonComponent>
      </Card>
    </>
  );
};

export default articleCard;
