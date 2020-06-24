import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import Avatar from "./Avatar";
import FatText from "./FatText";
import FollowButton  from "../Component/FollowButton";


const Card = styled.div`
    ${props => props.theme.whiteBox}
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:20px;
`;

const EAvatar = styled(Avatar)`
    margin-bottom:15px;
`;

const ELink = styled(Link)`
    color:inherit;
    margin-bottom:10px;
`;

const UserCard = ({username, isFollowing, url, selfMe, id}) => (
    <Card>
        <EAvatar url={url} size={"md"}/>
        <ELink to={`/${username}`}>
            <FatText text={username}/>
        </ELink>
        {!selfMe && <FollowButton isFollowing={isFollowing} id={id}/>}
        
    </Card>
);

UserCard.propTypes = {
    username:PropTypes.string.isRequired,
    isFollowing:PropTypes.bool.isRequired,
    url:PropTypes.string.isRequired,
    selfMe:PropTypes.bool.isRequired,
    id:PropTypes.string.isRequired
}

export default UserCard;