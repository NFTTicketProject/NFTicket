import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AnimalCard from "../components/AnimalCard";
import MyAnimalCard from "../components/MyAnimalCard";
import {
  mintAnimalTokenContract,
  saleAnimalTokenAddress,
  saleAnimalTokenContract,
} from "../web3Config";

function MyAnimal({ account }) {
  const [animalCardArray, setAnimalCardArray] = useState([]);
  const [saleStatus, setSaleStatus] = useState(false);

  const getAnimalTokens = async () => {
    try {
      const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();

      const tempAnimalCardArray = []; // for문 돌면서 animalType 넣을 임시 배열
      for (let i = 0; i < parseInt(balanceLength, 10); i++) {
        // 컨트랙트에서 불러오기
        const animalTokenId = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, i)
          .call();
        const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();

        // 토큰 가격
        const animalPrice = await saleAnimalTokenContract.methods
          .animalTokenPrices(animalTokenId)
          .call();

        // 임시 배열에 넣기
        tempAnimalCardArray.push({ animalTokenId, animalType, animalPrice });
      }

      setAnimalCardArray(tempAnimalCardArray); // 내가 가진 카드 배열
    } catch (err) {
      console.error(err);
    }
  };

  // 판매 등록 여부 확인 - isApprovedForAll에서 true/false 여부를 확인 가능
  const getIsApprovedForAll = async () => {
    try {
      const response = await mintAnimalTokenContract.methods
        .isApprovedForAll(account, saleAnimalTokenAddress)
        .call();

      // console.log(response);
      if (response.status) {
        setSaleStatus(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 판매 등록을 위해 이 계약서(saleAnimalTokenAddress)가 판매 권한을 받아야 함(from mintAnimalTokenAddress)
  const approveToggle = async () => {
    try {
      if (!account) return;
      const response = await mintAnimalTokenContract.methods
        .setApprovalForAll(saleAnimalTokenAddress, !saleStatus)
        .send({ from: account });

      if (response) {
        setSaleStatus(!saleStatus);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //
  useEffect(() => {
    // account가 늦게 들어오기 때문에 일단 없으면 return
    if (!account) return;
    // account가 들어오면 그때 다시 한 번 실행
    getAnimalTokens();
    getIsApprovedForAll();
  }, [account]);

  // useEffect(() => {
  //   console.log(animalCardArray);
  // }, [animalCardArray]);

  return (
    <>
      <div>
        <h1>Sale Status: {saleStatus ? "True" : "False"}</h1>
        <button onClick={approveToggle}>{saleStatus ? "Cancel" : "Approve"}</button>
      </div>
      <div>
        <h1>MyAnimal</h1>
        {animalCardArray &&
          animalCardArray.map((v, i) => {
            return (
              <MyAnimalCard
                key={i}
                animalTokenId={v.animalTokenId}
                animalType={v.animalType}
                animalPrice={v.animalPrice}
                saleStatus={saleStatus}
                account={account}
              />
            );
          })}
      </div>
    </>
  );
}

export default MyAnimal;
