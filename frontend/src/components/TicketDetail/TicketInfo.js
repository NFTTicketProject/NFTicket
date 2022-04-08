import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

import { useNavigate } from "react-router-dom";


const TicketInfoArea = styled.div`
  width: 700px;
  display: flex;
  margin-right: 70px;
`;

const TicketData = styled.div`
  width: 100%;
`;

const SellerInfoBox = styled.div`
  margin-bottom: 50px;
`;

const TicketInfoBox = styled.div`
  margin-bottom: 50px;
`;

const NFTicketInfoBox = styled.div`
`;


const TicketInfo = (props) => {

  // console.log('props TicketInfo', props)

  const [sellerInfo, setSellerInfo] = useState({});  // 판매자 정보

  // api 통해 판매자의 닉네임과 이미지 가져오기
  const getSellerInfo = () => {
    if (props.owner) {
      axios
        .get(`https://nfticket.plus/api/v1/profile/${props.owner}`)
        .then((res) => {
          // console.log('getSellerInfo', res.data);
          setSellerInfo(res.data);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    getSellerInfo();
  }, [props]);

  // console.log('sellerInfo', sellerInfo);
  // console.log('sellerInfo', sellerInfo.nickname);
  // console.log('sellerInfo', sellerInfo.description);
  // console.log('sellerInfo Image', sellerInfo.image_uri);


  return (
    <div>
      <TicketInfoArea>
        <TicketData>
          <h1>{props.showTitle}</h1>
          <SellerInfoBox>
            <div
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              <img
                style={{ width: "70px", height: "70px", borderRadius: "100px", margin: "10px", marginRight: "20px", objectFit: "cover",
              }}
                src={`https://nfticket.plus/showipfs/ipfs/${sellerInfo.image_uri}`}
                onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "../images/MetaMask_Fox.svg.png";
                    }}
                alt="@/images/default_profile.png"
                
              ></img>
              <div
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start'  }}
              >
                <p
                  style={{ fontSize: "16px", color: "#a8a8a8", fontWeight: 400, marginBottom: "4px" }}
                  >소유자</p>
                <p
                  style={{ fontSize: "20px", fontWeight: 700 }}
                >{sellerInfo.nickname}</p>
                </div>
            </div>
            <hr style={{ marginTop: "40px", border: "0.5px solid #D8D8D8" }}></hr>
          </SellerInfoBox>
          <TicketInfoBox>
            <p style={{ lineHeight: "200%", color: "#666" }}>{ props.description }</p>
          </TicketInfoBox>
          <NFTicketInfoBox>
            <p
              style={{ fontSize: "26px", fontWeight: 600, marginBottom: '28px' }}
            >NFTicket 정보</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <p>소유자</p>
              <p>{sellerInfo.nickname}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <p>컨트렉트 주소</p>
              <p>{props.ticketContractNumber}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <p>티켓 ID</p>
              <p>{props.ticketId}</p>
            </div>
          </NFTicketInfoBox>
        </TicketData>
      </TicketInfoArea>
    </div>
  );
};

export default TicketInfo;
