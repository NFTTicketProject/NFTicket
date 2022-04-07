import React from "react";
import { useState } from "react";
import { saleAnimalTokenContract, web3 } from "../utils/web3Config";
import AnimalCard from "./AnimalCard";

function MyAnimalCard({ animalTokenId, animalType, animalPrice, saleStatus, account }) {
  const [sellPrice, setSellPrice] = useState("");
  const [myAnimalPrice, setMyAnimalPrice] = useState(animalPrice);

  const onChangeSellPrice = (e) => {
    setSellPrice(e.target.value);
  };

  const onClickCell = async () => {
    try {
      if (!account || !saleStatus) return;
      const response = await saleAnimalTokenContract.methods
        .setForSaleAnimalToken(animalTokenId, web3.utils.toWei(sellPrice, "ether"))
        .send({ from: account });
      // console.log(response);
      if (response) {
        setMyAnimalPrice(web3.utils.toWei(sellPrice, "ether"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <AnimalCard animalType={animalType} />
      {myAnimalPrice === "0" ? (
        <div>
          <div>
            <input type="number" value={sellPrice} onChange={onChangeSellPrice} /> Ether
          </div>
          <button onClick={onClickCell}>Sell</button>
        </div>
      ) : (
        <div>{web3.utils.fromWei(myAnimalPrice)} Ether</div>
      )}
    </div>
  );
}

export default MyAnimalCard;
