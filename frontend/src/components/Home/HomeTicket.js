/* eslint-disable */
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
const PerformContainer = styled.div`
  display: flex-column;
  width: 203px;
  margin: 20px;
`;

const PosterImgContainer = styled.img`
  width: 203px;
  height: 270px;
  background-color: gray;
  &:hover {
    transform: scale(1.03);
  }
`;

const NameDiv = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const ShowSellerName = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: 5px;
`;

const HomeTicket = (props) => {
const userData = JSON.parse(localStorage.getItem("userAccount"));
  // const checkAccount = async () => {
  //   try {
  //     if (!localStorage.getItem("userAccount")){
  //       swal.fire({
  //           title : "지갑을 연결해주세요.",
  //               icon  : "warning",
  //               closeOnClickOutside : false
  //         }).then(function(){
  //           // 이벤트
  //           navigate('/MyPage')
  //           // alert('hello')
  //         });
  //       // alert('hello')
  //     }
  //   } catch(err){
  //     console.error(err)
  //   }
  // }


  const [toggle, setToggle] = useState(true)
  const checkAccount = async () => {
    try {
      if (!localStorage.getItem("userAccount")){
        setToggle(false)
      } else if (props.ticketSeller.toLocaleLowerCase() === userData.account.toLocaleLowerCase()) {
        setToggle(false)
      } else{
        setToggle(true)
      }
    } catch(err){
      console.error(err)
    }
  }
  console.log(props.ticketSeller, userData.account)

  useEffect(() => {
    checkAccount()
  }, [])
  

  const handleError = (e) => {
    e.target.src = "images/posterImg1.png";
  };

  return (
    <PerformContainer>
      {toggle ? (<Link to={`/Ticket/${props.ticketId}`}>
        <PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${props.ticketUri}`}
          onError={handleError}
          alt='poster img'
        />
      </Link>) : (
        <PosterImgContainer
          src={`https://nfticket.plus/showipfs/ipfs/${props.ticketUri}`}
          onError={handleError}
          alt='poster img'
        />
      )}
      
      <NameDiv style={{ fontSize: "14px" }}>{props.name}</NameDiv>
      <hr />
      <ShowSellerName style={{ fontSize: "14px", color: "gray" }}>
        판매자 : {props.ticketSellerName}
      </ShowSellerName>
      <ShowSellerName style={{ fontSize: "14px", color: "gray" }}>
        가격 : {props.price} SSF
      </ShowSellerName>
    </PerformContainer>
  );
};

export default HomeTicket;
