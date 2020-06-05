import React from 'react';
import styled, {ThemeProvider} from "styled-components";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from "../Styles/GlobalStyles"
import Theme from "../Styles/Theme"
import AppRouter from './Router';
import Footer from "./Footer"
import {gql} from "apollo-boost";
import { useQuery } from 'react-apollo-hooks';


const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
    margin: 0 auto;
    max-width: 935px;
    width: 100%;
`;


export default () => {

  const {
    data : {isLoggedIn}
  } = useQuery(QUERY);  

  return (
      <ThemeProvider theme={Theme}>
      <Wrapper>
        <GlobalStyles/>    
        <AppRouter isLoggedIn={isLoggedIn}/>
        <Footer/>
        <ToastContainer position={toast.POSITION.TOP_CENTER}/>
      </Wrapper>
    </ThemeProvider>
  );
};
