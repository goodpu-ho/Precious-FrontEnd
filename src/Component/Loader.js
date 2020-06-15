import React from "react";
import styled, {keyframes} from "styled-components";
import { Loading } from "./Icon";

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0
    }
`;
const Loader = styled.div`
    animation:${Animation} 1s linear infinite
`;

export default () => (
  <Loader>
    <Loading size={48}/>
  </Loader>
);
