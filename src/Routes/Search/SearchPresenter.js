import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Component/FatText";
import Loader from "../../Component/Loader";
import UserCard from "../../Component/UserCard";
import SqurePost from "../../Component/SqurePost";

const Section = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  height: 50vh;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {    
    
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text="Search for something" />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    // console.log(data.searchPost);
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text={"No User Found"} />
          ) : (
            data.searchUser.map((user) => (
              <UserCard
                key={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                selfMe={user.selfMe}
                id={user.id}
              />
            ))
          )}
        </Section>

        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text={"No Post Found"} />
          ) : (
            data.searchPost.map( post => (                
              <SqurePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
};

export default SearchPresenter;
