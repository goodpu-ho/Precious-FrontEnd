import React from "react";
import styled from "styled-components";
import {gql} from "apollo-boost";
import {withRouter} from "react-router-dom";
import {useQuery} from "react-apollo-hooks";

import ProfilePresenter from "./ProfilePresenter";

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


export default withRouter(({ match: { params: { username } } }) => {
    
    // console.log(username);
    
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    return <ProfilePresenter loading={loading} data={data} />
  });