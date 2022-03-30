import React from 'react';
import styled from 'styled-components';

import PeopleIcon from '@mui/icons-material/People';


const CommunityItem = ()=>{

  const CommunityContainer = styled.div`
    display: flex-column;
    width: 280px;
    height: 380px;
    margin: 10px;
    border-radius: 15px;
    box-shadow: 8px 6px 15px grey;
  `;

  const CommunityImgContainer = styled.img`
    width: 280px;
    height: 270px;
    border-radius: 15px 15px 0px 0px;
  `;


  return (
    <CommunityContainer>
      <CommunityImgContainer src='images/communityImg.jpeg' alt=''>
        
      </CommunityImgContainer>
      <div style={{ marginLeft: "12px", marginRight: "12px"}}>
        <p style={{ fontSize: "18px", fontWeight: "700", marginBottom: "4px" }}>뮤지컬 데스노트 친목방</p>
        <span  style={{ fontSize: "12px" }}>데스노트 넘버 공유하면서 이야기 할 분 모여요</span>

        <div style={{ display: "flex", alignContent: "center", marginTop: "14px"}}>
          <PeopleIcon style={{ fontSize: "medium" }}></PeopleIcon>
          <div style={{ display: "flex", alignContent: "center", marginLeft: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: "400" }}>5</span>
            <span style={{ fontSize: "12px", fontWeight: "400" }}>/</span>
            <span style={{ fontSize: "12px", fontWeight: "400" }}>15</span>
          </div>
        </div>
      </div>

      
    </CommunityContainer>
  );

}

export default CommunityItem
