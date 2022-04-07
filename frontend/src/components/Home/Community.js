import React from 'react';
import { Link } from "react-router-dom";

import styled from 'styled-components';

import CommunityItem from './CommunityItem';


const Community = ()=>{
  
  const CommunityContainer = styled.div`
    display: flex-column;
    align-content: center;
    margin-top: 70px;
  `;

  const CommunityItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
    justify-content: center;
    background-color: ##707B7C;
  `;

  const StyledCommunityLink = styled(Link)`
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 12px;
  text-decoration: none;
  color: black;
`;

  const CommunityImageContainer = styled.img`
    width: 60vw;
    border-radius: 15px;
  `

  return (
    <div>
      <CommunityContainer>
        <StyledCommunityLink to="Community">
          <div style={{ display: 'flex', flexDirection: 'column', width: "60vw", justifyContent: 'center'}}>
            <p style={{ marginBottom: "12px" }}>커뮤니티 💫</p>
            <p style={{ display: "flex", justifyContent: "start", fontSize: "20px", fontWeight: "400", marginBottom: "30px" }}>
                NFTicket만의 메타버스에서 다른 관객들과 소통하고 전시도 함께 구경할 수 있어요 !
            </p>
          </div>
        </StyledCommunityLink> 
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "100px" }}>
          <Link to="Community">
          <CommunityImageContainer src='images/ssafy_community.gif'/>
          </Link>
            
        </div>
      </CommunityContainer>
    </div>
  );

}

export default Community
