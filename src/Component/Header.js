import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import useInput from "../Hooks/useInput";
import Input from "./Input";
import { Compass, User, HeartEmpty, Logo } from "./Icon";
import {ME} from "../SharedQueries"

const Header = styled.header`
  width: 100%;
  border-radius: 0px;
  border: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index:2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColum = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  height: auto;
  font-size: 14px;
  border-radius: 3px;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200%;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export default withRouter(({ history }) => {
  const search = useInput("");
  const { data, loading } = useQuery(ME); // loading 추가
  if (loading) return "";
  const { me } = data;
  console.log(me);

  const onSearchSubmmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColum>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColum>
        <HeaderColum>
          <form onSubmit={onSearchSubmmit}>
            <SearchInput 
                placeholder={"Searach"} 
                value = {search.value}    
                onChange = {search.onChange}
            />
          </form>
        </HeaderColum>
        <HeaderColum>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {!data.me ? (
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={data.me.username}>
              <User />
            </HeaderLink>
          )}
        </HeaderColum>
      </HeaderWrapper>
    </Header>
  );
});
