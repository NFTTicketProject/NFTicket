import React, { useEffect, useState } from "react";
import {
  web3,
  showScheduleAbi,
  myTicketContract,
  ticketSaleManagerContract,
  ticketSaleManagerAddress,
} from "../utils/web3Config";

function TradeTicket({ showScheduleAddress, userData }) {
  const [saleStatus, setSaleStatus] = useState(false);
  const [tradeDetail, setTradeDetail] = useState({});

  const handleTicketTrade = (e) => {
    setTradeDetail({ ...tradeDetail, [e.target.name]: e.target.value });
  };

  const approveToggle = async () => {
    try {
      const res = await myTicketContract.methods
        .setApprovalForAll(ticketSaleManagerAddress, !saleStatus)
        .send({ from: userData.account });
      console.log(res);
      if (res.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
      console.log(res);
      if (res.status) {
        alert("판매 등록 완료");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
                name="ticketId"
                value={tradeDetail.ticketId}
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

          <button onClick={mintTrade}>거래 발급</button>
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
