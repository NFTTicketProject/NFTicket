import React, { useEffect, useState } from "react";
import {
  web3,
  showScheduleAbi,
  myTicketContract,
  ticketSaleManagerContract,
  ticketSaleManagerAddress,
} from "../utils/web3Config";

function TradeTicket({ showScheduleAddress, userData, register }) {
  // console.log(register.ticketID);
  const [saleStatus, setSaleStatus] = useState(false);
  const [tradeDetail, setTradeDetail] = useState({});
  const [isBuyable, setIsBuyable] = useState(false);
  const [saleAddr, setSaleAddr] = useState();
  // console.log(isBuyable);
  const getTicketOwner = async () => {
    try {
      const res = await ticketSaleManagerContract.methods.ownerOf(userData.account).call();
      setIsBuyable(res.toLocaleLowerCase() === userData.account.toLocaleLowerCase());
      // console.log(isBuyable);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTicketTrade = (e) => {
    setTradeDetail({ ...tradeDetail, [e.target.name]: e.target.value });
  };

  // approve
  const approveToggle = async () => {
    try {
      const res = await myTicketContract.methods
        .setApprovalForAll(ticketSaleManagerAddress, !saleStatus)
        .send({ from: userData.account });
      // console.log(res);
      if (res.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 거래 발급
  const mintTrade = async () => {
    // console.log(tradeDetail);
    try {
      const res = await ticketSaleManagerContract.methods
        .create(
          // parseInt(register.ticketID),
          parseInt(tradeDetail.ticketID),
          tradeDetail.description,
          parseInt(tradeDetail.price),
          parseInt(tradeDetail.startedAt),
          parseInt(tradeDetail.endedAt)
        )
        .send({ from: userData.account });
      // console.log("🐸", res);
      // setSaleAddr(res.events[0].returnValues.saleAddr);
      if (res.status) {
        alert("판매 등록 완료");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTicketOwner();
  }, []);

  return (
    <div>
      <h1>TradeTicket</h1>
      <button onClick={approveToggle}>Toggle</button>
      {saleStatus ? (
        <div>
          <h1>sale Status: True</h1>
          <div>
            <div>
              ticketId:
              <input
                type="number"
                name="ticketID"
                // value={register.ticketID}
                value={tradeDetail.ticketID}
                onChange={handleTicketTrade}
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
          </div>

          <button disabled={isBuyable} onClick={mintTrade}>
            거래 발급
          </button>
        </div>
      ) : (
        <div>
          <h1>sale Status: False</h1>
        </div>
      )}
    </div>
  );
}

export default TradeTicket;
