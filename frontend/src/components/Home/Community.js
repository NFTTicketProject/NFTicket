import React from 'react';
import styled from 'styled-components';

import CommunityItem from './CommunityItem';


const Community = ()=>{
  
  const CommunityContainer = styled.div`
    display: flex-column;
    align-content: start;
    margin-top: 40px;
  `;

  const CommunityItemContainer = styled.div`
    display: flex;
    justify-content: center;
  `;

  return (
    <div>
      <CommunityContainer>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ width: "1180px"}}>커뮤니티</h2>
        </div>
        <CommunityItemContainer>
          <CommunityItem/>
          <CommunityItem/>
          <CommunityItem/>
          <CommunityItem/>
        </CommunityItemContainer>
      </CommunityContainer>
    </div>
  );

}

export default Community
