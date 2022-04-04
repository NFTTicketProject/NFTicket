import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { Link, useNavigate } from "react-router-dom";

// import DatePicker from "@mui/lab/DatePicker";
// import { DatePicker } from "@material-ui/pickers";
import DatePicker from "react-datepicker";
import { ticketSaleManagerContract, myTicketContract } from "../../utils/web3Config";

// Modal
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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

const SmallTitleCss = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 16px;
`;

const CoverBox = styled.div`
  border: 1px solid #dadee2;
  border-radius: 20px;
`;

const DatePickerCss = styled.div`
  display: flex;
  justify-content: center;
`;

const ColorHr = styled.hr`
  border: 1px solid #dadee2;
`;

const ToggleButtonCss = styled.div`
  margin-left: 20px;
  margin-bottom: 10px;
`;

const SeatCss = styled.div`
  font-size: 14px;
  margin: 16px;
`;

const CastingDivCss = styled.div`
  margin-left: 16px;
  margin-bottom: 20px;
`;

const CastingCss = styled.span`
  margin-left: 7px;
`;

const ButtonBoxCss = styled.div`
  margin-top: 10px;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const TopRight = (props) => {
  const navigate = useNavigate();
  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tradeDetail, setTradeDetail] = useState({ ticketId: props.ticketId });
  const handleTicketTrade = (e) => {
    setTradeDetail({ ...tradeDetail, [e.target.name]: e.target.value });
  };
  // console.log(props);
  // console.log(tradeDetail);
  // 거래 발급
  const mintTrade = async () => {
    console.log(tradeDetail);
    try {
      const res = await ticketSaleManagerContract.methods
        .create(
          parseInt(tradeDetail.ticketId),
          tradeDetail.description,
          parseInt(tradeDetail.price),
          parseInt(tradeDetail.startedAt),
          parseInt(tradeDetail.endedAt)
        )
        .send({ from: userData.account });
      console.log("🐸", res);
      // setSaleAddr(res.events[0].returnValues.saleAddr);
      if (res.status) {
        alert("판매 등록 완료");
        navigate("/Market");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 일반
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = React.useState();
  const [isOwner, setIsOwner] = useState(true);
  const [isSellable, setIsSellable] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userAccount"));

  // const getTicketOwner = async () => {
  //   try {
  //     const res = await ticketSaleManagerContract.methods.ownerOf(userData.account).call();
  //     setIsBuyable(res.toLocaleLowerCase() === userData.account.toLocaleLowerCase());
  //     console.log(isBuyable);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleTicketTrade = (e) => {
  //   setTradeDetail({ ...tradeDetail, [e.target.name]: e.target.value });
  // };

  // // approve
  // const approveToggle = async () => {
  //   try {
  //     const res = await myTicketContract.methods
  //       .setApprovalForAll(ticketSaleManagerAddress, !saleStatus)
  //       .send({ from: userData.account });
  //     console.log(res);
  //     if (res.status) {
  //       setSaleStatus(!saleStatus);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // // 거래 발급
  // const mintTrade = async () => {
  //   console.log(tradeDetail);
  //   try {
  //     const res = await ticketSaleManagerContract.methods
  //       .create(
  //         // parseInt(register.ticketID),
  //         parseInt(tradeDetail.ticketID),
  //         tradeDetail.description,
  //         parseInt(tradeDetail.price),
  //         parseInt(tradeDetail.startedAt),
  //         parseInt(tradeDetail.endedAt)
  //       )
  //       .send({ from: userData.account });
  //     console.log("🐸", res);
  //     // setSaleAddr(res.events[0].returnValues.saleAddr);
  //     if (res.status) {
  //       alert("판매 등록 완료");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getTicketOwner();
  // }, []);

  // console.log(props);
  const checkOwner = async () => {
    // 티켓 소유자인지 확인 - 소유자만 판매 가능
    const owner = await myTicketContract.methods.ownerOf(parseInt(props.ticketId)).call();
    setIsSellable(owner.toLocaleLowerCase() === userData.account.toLocaleLowerCase());
  };

  useEffect(() => {
    checkOwner();
  }, []);

  // console.log(isSellable);

  return (
    <div>
      <CoverBox>
        {/* <SmallTitleCss>관람일</SmallTitleCss>
        <DatePickerCss>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline />
        </DatePickerCss>

        <ColorHr></ColorHr> */}

        <SmallTitleCss>좌석</SmallTitleCss>

        <SeatCss>
          {props.seatInfo.map((it, idx) => (
            <span key={idx}>
              <span>{it.ticketClassName} </span>
              <BoldSpan>{it.ticketClassMaxMintCount}석</BoldSpan>
              <span> / </span>
            </span>
          ))}
        </SeatCss>

        <ColorHr></ColorHr>

        <SmallTitleCss>캐스팅</SmallTitleCss>
        <CastingDivCss>{props.casting}</CastingDivCss>
      </CoverBox>

      <ButtonBoxCss>
        {/* 티켓 주인이면 꾸미기, 판매하기 버튼, 주인이 아니면 구매하기 버튼 */}
        {isSellable ? (
          <Stack spacing={1}>
            <Button
              sx={{
                fontWeight: "bold",
                color: "secondary.main",
                borderColor: "text.secondary",
                borderRadius: 3,
                py: 1.5,
              }}
              onClick={() => {
                navigate(`/decorate/${props.ticketId}`);
              }}
              variant="outlined"
            >
              꾸미기
            </Button>
            {/* <Button
              sx={{
                color: "text.primary",
                borderColor: "text.secondary",
                borderRadius: 3,
                py: 1.5,
              }}
              variant="outlined"
            >
              판매하기
            </Button> */}

            <Button
              onClick={handleOpen}
              sx={{
                color: "text.primary",
                borderColor: "text.secondary",
                borderRadius: 3,
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
                  <h1>TradeTicket</h1>
                  <div>
                    ticketId:
                    <input
                      type="number"
                      name="ticketId"
                      // value={register.ticketID}
                      value={tradeDetail.ticketId}
                      onChange={handleTicketTrade}
                      disabled={true}
                    />
                  </div>
                  <div>
                    description:
                    <input
                      type="text"
                      name="description"
                      value={tradeDetail.description}
                      onChange={handleTicketTrade}
                    />
                  </div>
                  <div>
                    price:
                    <input
                      type="text"
                      name="price"
                      value={tradeDetail.price}
                      onChange={handleTicketTrade}
                    />
                  </div>
                  <div>
                    startedAt:
                    <input
                      type="text"
                      name="startedAt"
                      value={tradeDetail.startedAt}
                      onChange={handleTicketTrade}
                    />
                  </div>
                  <div>
                    endedAt:
                    <input
                      type="text"
                      name="endedAt"
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
            <Button
              onClick={props.buyTicket}
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
            {/* <Button
              sx={{
                color: "text.primary",
                borderColor: "text.secondary",
                borderRadius: 3,
                py: 1.5,
              }}
              variant="outlined"
            >
              대기하기
            </Button> */}
          </Stack>
        )}
      </ButtonBoxCss>
    </div>
  );
};

export default TopRight;
