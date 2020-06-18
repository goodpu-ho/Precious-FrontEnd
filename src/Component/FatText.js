import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Text = styled.span`
    font-weight:600;
`;

const FatText = ({text, className}) => <Text classNmae={className}>{text}</Text>

FatText.propTypes = {
    text: PropTypes.string.isRequired
}

export default FatText;