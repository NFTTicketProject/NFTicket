import React from "react";
import { useState } from "react";
import AnimalCard from "../components/AnimalCard";
// solidity 컨트랙트 관련 data
import { mintAnimalTokenContract } from "../utils/web3Config";

function Mint() {
  const [newAnimalType, setNewAnimalType] = useState();
  let account = "0x72e342D7E5dDfc7aF7b6c470EeACe96b3B6c5679";
  // Mint 함수
  const onClickMint = async () => {
    try {
      if (!account) return;
      // 민트 결과 console에 찍기
      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({ from: account });
      console.log(response);

      if (response.status) {
        // balanceOf
        const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();
        console.log(`해당 주소가 보유하고있는 NFT 토큰의 개수:: ${balanceLength}`);
        // tokenOfOwnerByIndex
        const animalTokenId = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, parseInt(balanceLength.length, 10) - 1)
          .call();
        console.log(`owner가 가진 토큰 리스트 중 index에 해당하는 tokenID: ${animalTokenId}`);
        // tokenURI
        const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();

        setNewAnimalType(animalType);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div>
        {newAnimalType ? (
          <div>
            <AnimalCard animalType={newAnimalType} />
          </div>
        ) : (
          <div>Let's mint Animal Card</div>
        )}
      </div>
      <button onClick={onClickMint}>Mint</button>
    </>
  );
}

export default Mint;
