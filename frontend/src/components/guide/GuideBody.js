import React from "react";
import { useSelector } from "react-redux";
import GuideBodyComponent from "./GuideBodyComponent";

const GuideBody = () => {
  const pageNum = useSelector((state) => state.guide.page);

  if (pageNum === 1) {
    return (
      <div>
        <GuideBodyComponent
          icon='SellIcon'
          title='구매'
          body='관람하고자 하는 공연의 티켓을 구매하면서, 티켓을 NFT로 소장할 수 있습니다. 티켓을 구매할 때 지갑의 Ether 금액을 소모하여 NFT도 같이 구매합니다. MetaMask에 자동으로 연결합니다. 구매 후 나의 프로필에서 NFT를 확인할 수 있으며, 1~2분정도 시간이 걸릴 수도 있습니다. 이러한 지연 시간은 이더리움 네트워크 환경 상태에 따라 달라집니다.'
        />
        <GuideBodyComponent
          icon='ConfirmationNumberIcon'
          title='NFT가뭔가요'
          body='nft는 블라블라'
        />
        <GuideBodyComponent />
      </div>
    );
  } else if (pageNum === 2) {
    return (
      <div>
        <GuideBodyComponent icon='' title='' body='' />
      </div>
    );
  } else if (pageNum === 3) {
    return (
      <div>
        <h1>서비스 제공 환경 / 회원가입</h1>
      </div>
    );
  } else if (pageNum === 4) {
    return (
      <div>
        <h1>티켓 구매하기</h1>
      </div>
    );
  } else if (pageNum === 5) {
    return (
      <div>
        <h1>티켓 판매하기</h1>
      </div>
    );
  } else if (pageNum === 6) {
    return (
      <div>
        <h1>마켓 페이지</h1>
      </div>
    );
  } else if (pageNum === 7) {
    return (
      <div>
        <h1>개인정보 / 프로필</h1>
      </div>
    );
  } else if (pageNum === 8) {
    return (
      <div>
        <h1>나만의 티켓</h1>
      </div>
    );
  } else if (pageNum === 9) {
    return (
      <div>
        <h1>티켓 전시관</h1>
      </div>
    );
  } else if (pageNum === 10) {
    return (
      <div>
        <h1>커뮤니티</h1>
      </div>
    );
  } else if (pageNum === 11) {
    return (
      <div>
        <h1>용어 정리</h1>
      </div>
    );
  }
};

export default GuideBody;
