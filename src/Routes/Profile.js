import React from "react";
import styled from "styled-components";
import {gql} from "apollo-boost";
import {withRouter} from "react-router-dom";
import {useQuery} from "react-apollo-hooks";
import Loader from "../Component/Loader"
import Avatar from "../Component/Avatar"

const GET_USER = gql`
    query seeUser($username: String!){
        seeUser(username:$username){
            id
            avatar
            username
            fullName
            isFollowing
            bio
            selfMe            
            postsCount
            followingCount
            followersCount
            posts{
                id
                files {
                    url
                }
                likeCount
                commentCount
            }
        }
    }
`;

const Wrapper = styled.div`
  min-height: 60vh;
`;

const Header = styled.header``;

const HeaderColumn = styled.div``;

export default withRouter(({ match: { params: { username } } }) => {
    
    console.log(username);
    
    const { data, loading } = useQuery(GET_USER, { variables: { username } });

    if (loading) {
      return (
        <Wrapper>
          <Loader />
        </Wrapper>
      );
    } else {
      console.log(data);      
      const {
        seeUser: {
          avatar,
          username,
          fullName,
          isFollowing,
          selfMe,
          bio,
          followingCount,   
          followersCount,
          postsCount,
          posts
        }
      } = data;
      return (
        <>
          <Header>
            <HeaderColumn>
              <Avatar size="lg" url={avatar} />
            </HeaderColumn>
          </Header>
        </>
      );
    }
  });