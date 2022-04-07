import React from "react";
import { useSelector } from "react-redux";
import GuideBodyComponent from "./GuideBodyComponent";

const GuideBody = () => {
  const pageNum = useSelector((state) => state.guide.page);

  if (pageNum === 1) {
    // 시작하기
    return (
      <div>
        <GuideBodyComponent
          img='images/guide_show1.png'
          icon=''
          title='소장'
          body='관람하고자 하는 공연의 티켓을 구매하면서, 티켓을 NFT로 소장할 수 있습니다. 
티켓을 구매할 때 지갑의 Ether 금액을 소모하여 NFT도 같이 구매합니다. MetaMask에 연결되어 있어야 구매가 가능합니다. 
구매 후 나의 프로필에서 NFT를 확인할 수 있으며, 1~2분정도 시간이 걸릴 수도 있습니다. 이러한 지연 시간은 이더리움 네트워크 환경 상태에 따라 달라집니다.'
        />
        <GuideBodyComponent
          img='images/guide_community1.png'
          icon=''
          title='전시'
          body='프로필에 저장된 NFT를 개인 전시관에 게시하세요. 다른 사용자가 회원님의 개인 룸에 접속하여 소유한 NFTicket들을 관람할 수 있습니다.'
        />
        <GuideBodyComponent
          img='images/guide_ticket1.png'
          icon=''
          title='판매'
          body='소장한 NFTicket을 다른이에게 판매할 수 있습니다. 다른 필요한 이에게 판매해보세요.'
        />
        <GuideBodyComponent
          img='images/guide_community2.png'
          icon=''
          title='커뮤니티'
          body='공연의 팬임을 커뮤니티에 접속하여 인증하세요. 그리고 누가 더 열정적인 팬인지 확인해보세요.'
        />
      </div>
    );
  } else if (pageNum === 2) {
    // NFTickets
    return (
      <div>
        <GuideBodyComponent
          img=''
          icon='ConfirmationNumberIcon'
          title='NFTicket?'
          body='NFT + Ticket 의 합성어로서, 티켓 구매와 동시에 해당 티켓을 디지털 형태로서 고유하게 소유할 수 있습니다.'
        />
        <GuideBodyComponent
          img=''
          icon='LocalAtmIcon'
          title='NFT?'
          body='Non Fungible Token의 약자로서, 대체 불가능한 토큰이라는 의미입니다.
즉, NFT는 디지털 콘텐츠이며 희소성을 가진 고유한 자산으로 인식됩니다.'
        />
        <GuideBodyComponent
          img=''
          icon='LightbulbIcon'
          title='NFTicket 만이 제공하는 서비스의 특징은 무엇이 있나요?'
          body='1. 고유한 성질을 갖는 NFT의 특성을 이용해 암표, 위조표 거래를 방지합니다.
2. 티켓에 사용된 이미지를 커스텀하여 나만의 NFT를 제작할 수 있습니다.
3. 판매자가 구매자를 인식하여 얼마나 열성적인 팬인지를 알 수 있고, 티켓의 소유 여부에 따라 커뮤니티에 가입할 수 있는 권한을 갖습니다.'
        />
      </div>
    );
  } else if (pageNum === 3) {
    // 서비스 제공 환경 / 회원가입
    return (
      <div>
        <GuideBodyComponent
          img='images/guide_service1.png'
          icon=''
          title='서비스 제공환경'
          body='SSAFY 네트워크 환경에서 MetaMask 지갑 관리 프로그램을 사용한 로그인과 인증 서명기능이 제공됩니다.
NFTicket의 거래는 MetaMask로 연동된 지갑 계정 내의 SSF 가상화폐를 사용합니다.'
        />
        <GuideBodyComponent
          img='images/guide_profile1.png'
          icon=''
          title='회원가입'
          body='MetaMask에 지갑을 연결하여 회원가입 후, MyPage에 가셔서 톱니바퀴 아이콘을 클릭하시면 닉네임, 자기소개 정보 정보를 원하는대로 수정하실 수 있습니다.'
        />
      </div>
    );
  } else if (pageNum === 5) {
    // 티켓 구매하기
    return (
      <div>
        <GuideBodyComponent
          img='images/guide_purchase1.png'
          icon=''
          title='티켓 구매하기'
          body='판매자가 판매 등록한 티켓을 SSF 코인을 사용하여 구매할 수 있습니다.
구매자는 구입한 티켓을 구입할 수 있고, 관련 티켓의 소유권과 NFT를 지급받게 됩니다.'
        />
        <GuideBodyComponent
          img=''
          icon='GetAppIcon'
          title='수수료'
          body='구매할 경우 수수료가 발생하게 됩니다.'
        />
      </div>
    );
  } else if (pageNum === 4) {
    // 티켓 판매하기
    return (
      <div>
        <GuideBodyComponent
          img=''
          icon='StorefrontIcon'
          title='판매자 등록'
          body='티켓을 판매하거나 저희 서비스/ 플랫폼을 이용하기 위해서는 판매자로 등록하실 필요가 있습니다. 
저희는 발행된 티켓에 대해 어떠한 책임도 지지 않습니다.'
        />
        {/* <GuideBodyComponent
          img=''
          icon=''
          title='판매자 등록 방법'
          body='미완성'
        /> */}
        <GuideBodyComponent
          img=''
          icon=''
          title='판매시 설정 가능한 옵션'
          body='가격, 등급설정, 등급에 따른 이미지 설정, 좌석설정, 발행수, 레어티켓용 추가이미지 등록'
        />
        <GuideBodyComponent
          img=''
          icon='GetAppIcon'
          title='수수료'
          body='판매 물품 등록시 수수료가 발생합니다.'
        />
      </div>
    );
  } else if (pageNum === 6) {
    // 마켓 페이지
    return (
      <div>
        <GuideBodyComponent
          img=''
          icon=''
          title='마켓 페이지'
          body='마켓 페이지에 진입하시면, 다른 사용자들이 판매를 걸어놓은 NFTicket들을 볼 수 있습니다.
판매중인 NFTicket를 찾을 때 검색 기능과 분류 기능을 이용할 수 있습니다.
기타를 사용하여 확인하고 간단한 내용을 받을 수 있습니다.
관련 공연 내용은 클릭하여 세부 내용을 확인할 수 있습니다.'
        />
      </div>
    );
  } else if (pageNum === 7) {
    // 개인 정보 / 프로필
    return (
      <div>
        <GuideBodyComponent
          img=''
          icon=''
          title='개인정보'
          body='개인정보 페이지에서 자신의 닉네임, 자기소개 글, 연결된 지갑 계정을 확인하고 변경할 수 있습니다.'
        />
        <GuideBodyComponent
          img=''
          icon=''
          title='프로필'
          body='개인 프로필 화면에 진입하여 소유한 NFTicket을 확인할 수 있습니다.'
        />
      </div>
    );
  } else if (pageNum === 8) {
    // 나만의 티켓
    return (
      <div>
        <GuideBodyComponent
          img=''
          icon=''
          title='나만의 티켓'
          body='티켓 꾸미기 사이트가 제공되어 본인의 티켓을 꾸미고 저장할 수 있습니다.'
        />
        <GuideBodyComponent
          img=''
          icon=''
          title='티켓 꾸미기'
          body='자체 티켓 꾸미기 페이지가 제공되며, 이미지 합성, 마스킹, 스티커 붙이기 등의 편집기능이 제공됩니다. 
편집을 완료한 후에는 저장하여 본인의 개성적인 티켓으로 소유할 수 있습니다.'
        />
      </div>
    );
  } else if (pageNum === 9) {
    // 티켓 전시관
    return (
      <div>
        <GuideBodyComponent
          img=''
          icon=''
          title=''
          body='티켓 전시관에서는 다음과 같은 기능을 이용할 수 있습니다.'
        />
        <GuideBodyComponent
          img=''
          title='1. 네트워크 연결'
          body='다른 사용자의 전시관에 놀러갈 수 있습니다.'
        />
        <GuideBodyComponent
          img=''
          title='2. 자유로운 이동'
          body='전시관에서 자유롭게 이동하며 전시된 티켓을 구경할 수 있습니다.'
        />
        <GuideBodyComponent
          img=''
          title='3. 채팅'
          body='같은 전시관안에 있는 이용자와 채팅으로 대화를 나눌 수 있습니다.'
        />
        <GuideBodyComponent
          img=''
          title='4. 티켓 전시'
          body='나의 전시관에서 자신의 가지고있는 티켓을 전시할 수 있습니다.'
        />
      </div>
    );
  } else if (pageNum === 10) {
    // 커뮤니티
    return (
      <div>
        <GuideBodyComponent
          img=''
          icon=''
          title='커뮤니티'
          body='커뮤니티에서 자신과 같은 공연을 본 사람을 확인해보세요.'
        />
        <GuideBodyComponent
          img=''
          icon=''
          title='출입조건'
          body='커뮤니티에 출입할 수 있는 조건은 해당 공연의 NFTicket을 보여한 사람입니다.
판매자 또는 커뮤니티 개설자가 설정할 수 있습니다.'
        />
      </div>
    );
  } else if (pageNum === 11) {
    // 용어 정리
    return (
      <div>
        <GuideBodyComponent
          img=''
          icon=''
          title='민팅'
          body='NFT를 발행하는 것을 뜻합니다.'
        />
        <GuideBodyComponent
          img=''
          icon=''
          title='에디션'
          body='NFT의 고유한 구분 단위입니다. 예를들어 총 발행 수가 30개인 NFT의 에디션 #1인 경우, 30개 중 첫번째 에디션을 의미합니다.'
        />
        <GuideBodyComponent
          img=''
          icon=''
          title='크리에이터'
          body='NFT를 최초로 발행한 창작자이며, NFTicket 에서는 컨텐츠 제공자를 의미합니다.'
        />
        <GuideBodyComponent
          img=''
          icon=''
          title='같은 객체의 NFT'
          body='동일한 디지털 컨텐츠여도 연계된 복수 개의 NFT 각각을 에디션으로 지칭합니다.
각 에디션은 동일한 디지털 컨텐츠에 연결되어 있지만, 별도의 Token ID를 가지고있고
거래 이력이 구분되어 기록됩니다.'
        />
      </div>
    );
  }
};

export default GuideBody;
