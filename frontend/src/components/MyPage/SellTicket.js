import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  IERC20Contract,
  ticketSaleAbi,
  myTicketContract,
  ticketSaleManagerContract,
  showScheduleManagerContract,
  showScheduleAbi,
  web3,
} from "../../utils/web3Config";

function SellTicket({ saleAddr, userData }) {
  const ticketSaleContract = new web3.eth.Contract(ticketSaleAbi, saleAddr);
  const [isBuyable, setIsBuyable] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({});

  ////
  // const getUserNickname = async (wallet) => {
  //   try {
  //     const response = await axios.get(`https://nfticket.plus/api/v1/profile/nickname/${wallet}`);
  //     return response.data.nickname;
  //   } catch (err) {
  //     return "NFTicket";
  //   }
  // };
  const [saleTicketArray, setSaleTicketArray] = useState([]);
  const getTicketOnSale = async () => {
    try {
      const cnt = await myTicketContract.methods.totalSupply().call();
      console.log(cnt);
      const ticketInfos = [];
      for (let i = 1; i < parseInt(cnt) + 1; i++) {
        const saleAddr = await ticketSaleManagerContract.methods.getSaleOfTicket(i).call();
        if (saleAddr != "0x0000000000000000000000000000000000000000") {
          const showScheduleId = await myTicketContract.methods.getShowScheduleId(i).call();
          const showScheduleAddress = await showScheduleManagerContract.methods
            .getShowSchedule(showScheduleId)
            .call();
          const showScheduleContract = new web3.eth.Contract(showScheduleAbi, showScheduleAddress);
          const showId = await showScheduleContract.methods.getShowId().call();
          // 공연 발매자
          const stageSeller = await showScheduleManagerContract.methods.ownerOf(showId).call();
          // var stageSellerName = await getUserNickname(stageSeller);
          // 티켓 소유자
          const ticketSeller = await ticketSaleManagerContract.methods.ownerOf(i).call();
          // var ticketSellerName = await getUserNickname(ticketSeller);
          const showInfo = await axios.get(`https://nfticket.plus/api/v1/show/${showId}`);
          const ticketUri = await myTicketContract.methods.getTokenURI(i).call();
          const categoryName = showInfo.data.category_name;
          const ticketSaleContract = new web3.eth.Contract(ticketSaleAbi, saleAddr);
          const price = await ticketSaleContract.methods.getPrice().call();
          const startAt = await ticketSaleContract.methods.getStartedAt().call();
          var dateStart = new Date(startAt * 1000);
          var dateStartString =
            dateStart.getFullYear() + "." + (dateStart.getMonth() + 1) + "." + dateStart.getDate();
          const endAt = await ticketSaleContract.methods.getEndedAt().call();
          var dateEnd = new Date(endAt * 1000);
          var dateEndString =
            dateEnd.getFullYear() + "." + (dateEnd.getMonth() + 1) + "." + dateEnd.getDate();

          ticketInfos.push({
            ticketId: i,
            saleAddr,
            showId,
            // stageSellerName,
            // ticketSellerName,
            ticketUri,
            name: showInfo.data.name,
            price,
            dateStartString,
            dateEndString,
          });
        }
      }
      setSaleTicketArray(ticketInfos);
    } catch (err) {
      console.error(err);
    }
  };

  // const toggleBuy = async () => {
  //   // 구매자랑 판매자랑 다른지 확인 - 같으면 구매 불가
  //   const res = await ticketSaleManagerContract.methods.ownerOf(2).call();
  //   console.log(res);
  //   setIsBuyable(res.toLocaleLowerCase() === userData.account.toLocaleLowerCase());
  // };
  const getSaleTicketInfo = async () => {
    try {
      const getPrice = await ticketSaleContract.methods.getPrice().call();
      console.log(getPrice);
    } catch (err) {
      console.error(err);
    }
  };

  const buyTicket = async () => {
    try {
      // 1. gatSale()통해 contract 주소
      // 2. approve
      const approval = await IERC20Contract.methods
        .approve(saleAddr, 500)
        .send({ from: userData.account });
      console.log(approval);
      // 3. ticketSale.sol 발행
      if (approval.status) {
        const purchase = await ticketSaleContract.methods
          .purchase()
          .send({ from: userData.account });
        if (purchase.status) {
          alert("구매 완료");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // toggleBuy();
    getSaleTicketInfo();
    getTicketOnSale();
  }, []);

  console.log("🐸", saleTicketArray);

  return (
    <div>
      <div>{saleAddr}</div>
      <div></div>
      <button onClick={buyTicket} disabled={isBuyable}>
        구매
      </button>
    </div>
  );
}

export default SellTicket;
