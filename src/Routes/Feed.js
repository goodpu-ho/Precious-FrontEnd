import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import {Helmet} from "react-helmet";
import styled from "styled-components";
import Loader from "../Component/Loader";
import Post from "../Component/Post";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }

      isLiked
      likeCount
      comments {
        id
        text
        user {
          id
          username
        }
        createdAt
        updatedAt
      }

      createdAt
      updatedAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  console.log("feed test", data, loading);
  return (
    <Wrapper>
        <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
            location={post.location}
            caption={post.caption}
          />
        ))}
    </Wrapper>
  );
};
