import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";


const PurchaseTicketArea = styled.div`
  width: 300px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const CoverBox = styled.div`
  border: 1px solid #dadee2;
  border-radius: 20px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ButtonBoxCss = styled.div`
  margin-top: 10px;
`;

const PurchaseTicket = (props) => {

  const navigate = useNavigate();
  
  // 예매하기 버튼 클릭 시
  const doBook = () => {
    navigate(`/SelectSeat/${props.showScheduleAddress}`);
    // console.log('props정보', props);
  };

  return (
    <div>
      <PurchaseTicketArea>
        <CoverBox>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <p>판매가</p>
            <p>140,000 SSE</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <p>수수료</p>
            <p>1,400 SSE</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <p>구매가</p>
            <p>141,400 SSE</p>
          </div>
        </CoverBox>

        <ButtonBoxCss>
          <Stack spacing={1}>
            <Button
              onClick={doBook}
              sx={{
                fontWeight: "bold",
                color: "secondary.main",
                borderColor: "text.secondary",
                borderRadius: 3,
                py: 1.5,
              }}
              variant="outlined"
            >
              구매하기
            </Button>
          </Stack>
        </ButtonBoxCss>
      </PurchaseTicketArea>
    </div>
  );
};

export default PurchaseTicket;
