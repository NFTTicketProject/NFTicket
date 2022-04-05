import React, { useState } from "react";
import styled from "styled-components";

import QRCode from "react-qr-code";


const PosterArea = styled.div`
  display: flex;
  margin-bottom: 80px;
  margin-top: 80px;
`;

const Poster = styled.img`
  width: 315px;
  margin-right: 35px;
  display: flex;
  border-radius: 20px;
  box-shadow: 3px 3px 10px 3px gray;
`;

const TicketData = styled.div`
  width: 315px;
  background-color: black;
  border-radius: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 4px;
  box-shadow: 3px 3px 10px 3px gray;
`;

const TicketTitle = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TicketTitleItem = styled.div`
  display: flex;
  height: 100px;
  justify-content: center;
`;

const TicketImgInfoBox = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 0.5px solid #D8D8D8;
  padding-top: 0px;
  margin-bottom: 14px;
  padding-bottom: 14px;
`;

const TicketImgInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;


const TicketImgInfoItem = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 300;
  color: #D8D8D8;
`;

const TicketImgInfoItem2 = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #D8D8D8;
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TicketQRBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const TicketQR = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 60px;
  height: 60px;
`;

const TicketImage = (props) => {

  console.log('props TicketImage', props)

  return (
    <div>
      <PosterArea>
        <Poster src={`https://ipfs.io/ipfs/${props.posterUri}`} alt="poster img"></Poster>
        <TicketData>
          <TicketTitle>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '6px', marginBottom: '8px' }}>
              <p style={{ fontSize: '12px', color: '#D8D8D8'}}>NFTicket</p>
              <p style={{ fontSize: '12px', color: '#D8D8D8'}}>#{ props.ticketId }</p>
            </div>
            <div style={{ border: '0.5px solid #D8D8D8' }}>
              <div>
                <p style={{ display: 'inline', fontSize: '10px', marginLeft: '6px', color: '#D8D8D8'}}>Title</p>
              </div>
              <TicketTitleItem>
                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '14px', width: "220px" }}>{props.showTitle}</p>
              </TicketTitleItem>
            </div>
          </TicketTitle>
          <TicketImgInfoBox>
            <TicketImgInfo>
              <div style={{ marginRight: '24px', marginBottom: '10px' }}>
                <TicketImgInfoItem>Release</TicketImgInfoItem>
                <TicketImgInfoItem>Cast</TicketImgInfoItem>
                <TicketImgInfoItem>Location</TicketImgInfoItem>
                <TicketImgInfoItem>Price</TicketImgInfoItem>
                {/* <TicketImgInfoItem>Date</TicketImgInfoItem> */}
                <TicketImgInfoItem>Show time</TicketImgInfoItem>
                <TicketImgInfoItem>Age limit</TicketImgInfoItem>
              </div>
              <div>
                <TicketImgInfoItem2>{props.startedAt}</TicketImgInfoItem2>
                <TicketImgInfoItem2>{props.casting}</TicketImgInfoItem2>
                <TicketImgInfoItem2>{props.stageName}</TicketImgInfoItem2>
                <TicketImgInfoItem2>140,000 SSE</TicketImgInfoItem2>
                {/* <TicketImgInfoItem2>{props.showDuration}</TicketImgInfoItem2> */}
                <TicketImgInfoItem2>{props.showDuration}</TicketImgInfoItem2>
                <TicketImgInfoItem2>{props.allowedAge}</TicketImgInfoItem2>
              </div>
            </TicketImgInfo>
            {props.isSeller ? (
              <TicketQRBox>
                <TicketQR>
                  <QRCode 
                    value={ props.saleAddr }
                    bgColor="#FFFFFF00"
                    fgColor="#FFFFFF"
                    size="60"
                  />
                </TicketQR>
              </TicketQRBox>
            ):(
              <TicketQRBox>
                <TicketQR></TicketQR>
              </TicketQRBox>
            )}
            
          </TicketImgInfoBox>
          <p style={{ fontSize: '10px', color: '#D8D8D8' }}>NFTicket</p>
        </TicketData>
      </PosterArea>
    </div>
  );
};

export default TicketImage;
