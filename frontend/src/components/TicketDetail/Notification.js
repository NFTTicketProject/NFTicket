import React from "react";

import styled from "styled-components";

const NotiTitle = styled.h3`
  margin: 25px;
`;

const Marginli = styled.li`
  margin-top: 8px;
`;

const Notification = () => {
  return (
    <div>
      <NotiTitle>NFTicket 유의사항</NotiTitle>
      <ul>
        <Marginli>
          구매는 SSAFY 네트워크 내 싸피코인(SSF)이 차감되는 방식으로 진행됩니다.
        </Marginli>
        <Marginli>
          구매에 필요한 금액은 판매가에 수수료를 더한 총금액으로 산정됩니다.
        </Marginli>
        <Marginli>
          구매 거래가 체결되면 거래 취소가 불가하므로 신중하게 결정하여
          진행해주세요.
        </Marginli>
        <Marginli>
          구매 가격 제안에 필요한 금액은 제안가에 수수료를 더한 총금액으로
          산정됩니다.
        </Marginli>
        <Marginli>
          구매 가격 제안이 완료되면 해당 금액은 SSAFY 네트워크 내 거래 가능
          금액에서 제외됩니다.
        </Marginli>
        <Marginli>
          판매자가 가격 제안을 수락하면, SSAFY 지갑 계좌 내 계좌에서
          싸피코인(SSF)이 차감되어 거래가 체결될 수 있습니다.
        </Marginli>
        <Marginli>NFT의 외부 입출금은 현재 지원하지 않습니다.</Marginli>
        <Marginli>
          해당 NFT에 연계된 디지털상품 관련 분쟁 (지식재산권 분쟁 포함)이 발생한
          경우 해당 NFT에 대한 거래지원이 종료될 수 있습니다.
        </Marginli>
        <Marginli>
          NFT 소유자는 NFT와 연계된 “디지털 저작물“을 비상업적인 용도로
          사용(개인 SNS 내 업로드하는 행위 및 디지털 저작물 원본 그대로 개인적
          용도로 사용하는 행위)할 수 있는 권리와 NFT 입출금, 거래 등이 지원되는
          경우 지원되는 방식에 따라 NFT의 소유권을 타인에게 이전할 수 있는
          권리를 갖습니다.
        </Marginli>
      </ul>
    </div>
  );
};

export default Notification;
