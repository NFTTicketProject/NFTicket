import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import {
  web3,
  ticketSaleManagerAddress,
  ticketSaleManagerContract,
  myTicketContract,
  IERC20Contract,
  ticketSaleAbi,
} from "../../utils/web3Config";

// Modal
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PurchaseTicketArea = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

const CoverBox = styled.div`
  border: 1px solid #dadee2;
  border-radius: 10px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ButtonBoxCss = styled.div`
  width: 350px;
  margin-top: 10px;
`;

const ModalInput = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const WarningArea = styled.div`
  margin: 10px;
`;

const PurchaseTicket = (props) => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userAccount"));

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tradeDetail, setTradeDetail] = useState({ ticketId: props.ticketId });
  const [warning, setWarning] = useState(false);
  const handleTicketTrade = (e) => {
    setTradeDetail({ ...tradeDetail, [e.target.name]: e.target.value });
  };

  // swal
  const Toast = swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", swal.stopTimer);
      toast.addEventListener("mouseleave", swal.resumeTimer);
    },
  });

  const mintTrade = async () => {
    // console.log(tradeDetail);
    try {
      if (tradeDetail.description && tradeDetail.forSale && tradeDetail.price) {
        setWarning(false);
        // 유효성 체크 setapprovalforall(ticketSaleManagerAddress, true)
        const val = await myTicketContract.methods
          .setApprovalForAll(ticketSaleManagerAddress, true)
          .send({ from: userData.account });

        if (val.status) {
          Toast.fire({
            icon: "success",
            title: `판매 Progress 1/2`,
          });
          // create
          const res = await ticketSaleManagerContract.methods
            .create(
              parseInt(tradeDetail.ticketId),
              tradeDetail.description,
              parseInt(tradeDetail.price),
              0,
              parseInt(tradeDetail.forSale * 60 * 60)
            )
            .send({ from: userData.account });
          // setSaleAddr(res.events[0].returnValues.saleAddr);
          if (res.status) {
            swal
              .fire({
                title: "판매 등록이 완료되었습니다.",
                icon: "success",
                closeOnClickOutside: false,
              })
              .then(function () {
                navigate("/Market");
              });
            // alert("판매 등록 완료");
            // navigate("/Market");
          }
        }
      } else {
        setWarning(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(warning);
  // 예매하기 버튼 클릭 시
  const doBook = () => {
    navigate(`/SelectSeat/${props.showScheduleAddress}`);
    // console.log('props정보', props);
  };

  // 판매자, 구매자 구분 및 판매 완료, 판매 중 구분
  const [ticketState, setTicketState] = useState();
  const getTicketState = () => {
    var ticketRender = "";
    if (props.isSellable && props.isEnded) {
      // 판매자이면서 판매 중일 때 - 꾸미가와 판매하기만 보이기
      ticketRender = "justSeller butSelling";
    } else if (props.isSellable && props.isEnded === false) {
      // 판매자이지만 판매중이 아닌 티켓 - 꾸미기와 판매하기만 보이기
      ticketRender = "justSeller";
    } else if (props.isSellable === false && props.isEnded) {
      // non판매자이지만 판매중인 티켓 - 구매하기만 보이기
      ticketRender = "justBuyer butSelling";
    } else if (props.isSellable === false && props.isEnded === false) {
      // 판매자이지만 판매중이 아닌 티켓 - 꾸미기와 판매하기만 보이기
      ticketRender = "justBuyer";
    }
  };

  // 티켓 구매
  // 구매
  const [saleAddr, setSaleAddr] = useState();
  const getTicketAddr = async () => {
    try {
      const getSale = await ticketSaleManagerContract.methods
        .getSaleOfTicket(parseInt(props.ticketId))
        .call();
      // console.log(getSale);
      setSaleAddr(getSale);
    } catch (err) {
      console.error(err);
    }
  };
  // const ticketSaleContract = new web3.eth.Contract(ticketSaleAbi, saleAddr);
  // const buyTicket = async () => {
  //   try {
  //     // // 유효성 체크 setapprovalforall(ticketSaleManagerAddress, true)
  //     // const val = await myTicketContract.methods
  //     //   .setApprovalForAll(saleAddr, true)
  //     //   .send({ from: userData.account });
  //     // 1. gatSale()통해 contract 주소
  //     // 2. approve
  //     const approval = await IERC20Contract.methods
  //       .approve(saleAddr, 500)
  //       .send({ from: userData.account });
  //     console.log(approval);
  //     // 3. ticketSale.sol 발행
  //     if (approval.status) {
  //       const purchase = await ticketSaleContract.methods
  //         .purchase()
  //         .send({ from: userData.account });
  //       if (purchase.status) {
  //         alert("구매 완료");
  //         navigate("/MyPage");
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const [toggle, setToggle] = useState(true);
  const isOnSale = () => {
    const now = new Date().getTime();
    // 판매중
    if (props.getEndedAt * 1000 > now) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  useEffect(() => {
    getTicketAddr();
    isOnSale();
  }, []);

  // console.log('PurchasePage', props)
  // console.log('isEnded', props.isEnded)
  // console.log('isSellable', props.isSellable)
  // console.log('endedAt🐸', props.getEndedAt)

  return (
    <div>
      <PurchaseTicketArea>
        {/* 티켓 주인이면 꾸미기, 판매하기가 가능하다는 문구, 주인이 아니면 판매가 보여주기 */}
        {props.isSellable ? (
          <p></p>
        ) : (
          <CoverBox>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              {/* <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>티켓 정보</p> */}
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginTop: "8px",
                    marginBottom: "8px",
                  }}
                >
                  {props.showTitle}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    marginTop: "16px",
                    marginBottom: "6px",
                  }}
                >
                  공연 일자: {props.endAt}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  좌석 정보: {props.ticketClassName}-{props.ticketSeatIndex}
                </p>
                {/* <p>{ props. }</p> */}
              </div>
              <hr
                style={{
                  width: "100%",
                  border: "0.5px solid #c8c8c8",
                  marginTop: "20px",
                  marginBottom: "16px",
                }}
              ></hr>
            </div>
            {/* <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <p style={{ fontSize: '15px', fontWeight: '400', marginBottom: '8px'}}>판매가</p>
              <p style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px'}}>{props.price} SSF</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <p style={{ fontSize: '15px', fontWeight: '400', marginBottom: '16px'}}>수수료</p>
              <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '8px'}}>0.2 SSF</p>
            </div> */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                구매가
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
              >
                {props.price} SSF
              </p>
            </div>
          </CoverBox>
        )}
      </PurchaseTicketArea>
      <ButtonBoxCss>
        {/* 티켓 주인이면 꾸미기, 판매하기 버튼, 주인이 아니면 구매하기 버튼 */}
        {props.isSellable ? (
          <Stack spacing={1}>
            <Button
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
                color: "secondary.main",
                borderColor: "text.secondary",
                borderRadius: "10px",
                py: 1.5,
              }}
              onClick={() => {
                navigate(`/decorate/${props.ticketId}`);
              }}
              variant="outlined"
            >
              꾸미기
            </Button>
            <Button
              onClick={handleOpen}
              sx={{
                fontSize: "16px",
                color: "text.primary",
                borderColor: "text.secondary",
                borderRadius: "10px",
                // {/* 티켓 주인이면 꾸미기, 판매하기 버튼, 주인이 아니면 구매하기 버튼 */}
                // {props.isSellable ? (
                //   <Stack spacing={1}>
                //     <Button
                //       sx={{
                //         fontWeight: "bold",
                //         fontSize: "16px",
                //         color: "secondary.main",
                //         borderColor: "text.secondary",
                //         borderRadius: "10px",
                //         py: 1.5,
                //       }}
                //       onClick={() => {
                //         navigate(`/decorate/${props.ticketId}`);
                //       }}
                //       variant='outlined'
                //     >
                //       꾸미기
                //     </Button>
                //     {/* <Button
                //     sx={{
                //       color: "text.primary",
                //       borderColor: "text.secondary",
                //       borderRadius: 3,
                py: 1.5,
              }}
              variant="outlined"
            >
              판매하기
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div>
                  <ModalInput style={{ justifyContent: "center" }}>
                    <h1>TradeTicket</h1>
                  </ModalInput>

                  {/* <div>
                    ticketId:
                    <input
                      type="number"
                      name="ticketId"
                      // value={register.ticketID}
                      value={tradeDetail.ticketId}
                      onChange={handleTicketTrade}
                      disabled={true}
                    />
                  </div> */}
                  <ModalInput>
                    사용자 한마디:
                    <input
                      type="text"
                      name="description"
                      value={tradeDetail.description}
                      onChange={handleTicketTrade}
                    />
                  </ModalInput>
                  <ModalInput>
                    가격:
                    <input
                      type="text"
                      name="price"
                      value={tradeDetail.price}
                      onChange={handleTicketTrade}
                      style={{ width: "50px" }}
                    />
                    SSF
                  </ModalInput>
                  <ModalInput>
                    판매 기간:
                    <input
                      type="text"
                      name="forSale"
                      value={tradeDetail.forSale}
                      onChange={handleTicketTrade}
                      style={{ width: "50px" }}
                    />
                    HR
                  </ModalInput>
                  <ModalInput style={{ justifyContent: "center" }}>
                    <Button onClick={mintTrade}>거래 발급</Button>
                  </ModalInput>
                  <WarningArea>
                    {warning && <Alert severity="warning">정보를 모두 입력해주세요.</Alert>}
                  </WarningArea>
                </div>
              </Box>
            </Modal>
          </Stack>
        ) : (
          <div>
            {props.isEnded ? ( // true : 판매 완료, false : 판매 중 = 구매하기
              // <h2>{props.isEnded}</h2>
              <Stack spacing={1}>
                {/* price:
                      <input
                        type='text'
                        name='price'
                        value={tradeDetail.price}
                        onChange={handleTicketTrade}
                      />
                    </div>
                    <div>
                      startedAt:
                      <input
                        type='text'
                        name='startedAt'
                        value={tradeDetail.startedAt}
                        onChange={handleTicketTrade}
                      />
                    </div>
                    <div>
                      endedAt:
                      <input
                        type='text'
                        name='endedAt'
                        value={tradeDetail.endedAt}
                        onChange={handleTicketTrade}
                      />
                    </div>
                    <button onClick={mintTrade}>거래 발급</button>
                  </div>
                </Box>
              </Modal>
            </Stack>
          ) : (
            <Stack spacing={1}>
              {props.isEnded ? ( */}
                <Button
                  disabled
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333333",
                    borderColor: "text.secondary",
                    borderRadius: "10px",
                    py: 1.5,
                  }}
                  variant="outlined"
                >
                  판매 완료
                </Button>
              </Stack>
            ) : (
              <Stack spacing={1}>
                {/* variant='outlined'
                >
                  판매 완료
                </Button>
              ) : ( */}
                <Button
                  onClick={props.buyTicket}
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "secondary.main",
                    borderColor: "text.secondary",
                    borderRadius: "10px",
                    py: 1.5,
                  }}
                  variant="outlined"
                >
                  구매하기
                </Button>
              </Stack>
            )}
          </div>
        )}
      </ButtonBoxCss>
    </div>
  );
};

export default PurchaseTicket;
