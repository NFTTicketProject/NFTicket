import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  mintAnimalTokenContract,
  saleAnimalTokenAddress,
  saleAnimalTokenContract,
  web3,
} from "../utils/web3Config";
import AnimalCard from "./AnimalCard";

function SaleAnimalCard({
  animalType,
  animalPrice,
  animalTokenId,
  account,
  getOnSaleAnimalTokens,
}) {
  const [isBuyable, setIsBuyable] = useState(false); // 주인은 살 수 없도록 버튼 비활성화용

  const getAnimalTokenOwner = async () => {
    try {
      const response = await mintAnimalTokenContract.methods.ownerOf(animalTokenId).call();
      // console.log(response);
      // console.log(account);
      setIsBuyable(response.toLocaleLowerCase() === account.toLocaleLowerCase()); // 대소문자가 달라서... 처리 필요
    } catch (err) {
      console.error(err);
    }
  };

  const onClickBuy = async () => {
    try {
      if (!account) return;
      const response = await saleAnimalTokenContract.methods
        .purchaseAnimalToken(animalTokenId)
        .send({ from: account, value: animalPrice });

      if (response) {
        getOnSaleAnimalTokens();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAnimalTokenOwner();
  }, []);

  return (
    <div>
      <h1>Sale Animal Card</h1>
      <AnimalCard animalType={animalType} />
      <div>
        <p>{web3.utils.fromWei(animalPrice)} Ether</p>
      </div>
      <button disabled={isBuyable} onClick={onClickBuy}>
        Buy
      </button>
    </div>
  );
}

export default SaleAnimalCard;
