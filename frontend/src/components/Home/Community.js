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
    flex-wrap: wrap;
    width: 90vw;
    justify-content: center;
  `;

  return (
    <div>
      <CommunityContainer>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ width: "75vw" }}>커뮤니티</h2>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CommunityItemContainer>
            <CommunityItem/>
            <CommunityItem/>
            <CommunityItem/>
            <CommunityItem/>
          </CommunityItemContainer>
        </div>
      </CommunityContainer>
    </div>
  );

}

export default Community
