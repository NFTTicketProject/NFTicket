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
          img='images/guide_metamask1.png'
          icon=''
          title='MetaMask 설치'
          body='NFTicket 서비스를 이용하기 위해서는 MetaMask 설치가 필요합니다.
설치는 하단 링크 페이지로 이동하셔서 진행할 수 있습니다.'
        />
        <GuideBodyComponent
          img='images/guide_metamask2.png'
          icon=''
          title='새 지갑 생성하기'
          body='처음 시작하신다면 "지갑 생성"을 클릭하여 새 지갑을 생성합니다.
이미 지갑을 갖고 계시고, 시드 구문을 알고있다면 "지갑 가져오기"를 클릭해서 진행해도 됩니다.
이후 MetaMask 개선에 참여 페이지가 나타나면 "동의함" 또는 "괜찮습니다" 를 눌러서 계속 진행합니다.'
        />
        <GuideBodyComponent
          img='images/guide_metamask3.png'
          icon=''
          title='암호 생성'
          body='암호를 설정합니다. 암호는 절대 타인에게 공유되어서는 안됩니다.
시드 구문과 암호를 타인이 알게되면 지갑의 소유권이 타인에게 완전히 넘어가게 됩니다.
또한, 암호를 잃어버린다면 해당 지갑에 소유된 NFT는 영영 되찾을 수 없게 됩니다.
따라서 반드시 암호를 잘 기억하길 바랍니다.'
        />
        <GuideBodyComponent
          img='images/guide_metamask4.png'
          icon=''
          title='비밀 백업 시드 구문 생성'
          body='비밀 백업 구문은 지갑을 잃어버렸을 때 복구할 수 있게 해줍니다.
백업 구문 또한 암호와 같이 절대 공개해서는 안됩니다.
이후 백업 구문을 확인하는 절차가 진행됩니다.'
        />
        <GuideBodyComponent
          img='images/guide_metamask5.png'
          icon=''
          title='SSAFY 네트워크 추가'
          body='크롬 확장프로그램 목록을 열고, MetaMask 로고인 여우를 클릭합니다.
사진처럼 계정 이미지를 클릭하고, Settings -> Networks -> Add Network 를 순서대로 클릭합니다.'
        />
        <GuideBodyComponent
          img='images/guide_metamask6.png'
          icon=''
          title='SSAFY 네트워크 추가'
          body='위 사진과 같이 입력을 채워넣습니다. 처음 추가하는 경우라면 Save버튼이 활성화됩니다.'
        />
        <GuideBodyComponent
          img='images/guide_metamask7.png'
          icon=''
          title='SSAFY 계정 연결'
          body='SSAFY 지갑 생성 어플리케이션으로 생성한 SSAFY 계정 Private Key를 입력하여 계정 연결을 완료합니다.'
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
즉, NFT는 디지털 콘텐츠이며 희소성을 가진 고유한 자산입니다.'
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
          body='MetaMask에 지갑을 연결하여 회원가입 후, MyPage에 가셔서 톱니바퀴 아이콘을 클릭하시면 
닉네임, 자기소개 정보 정보를 원하는대로 수정하실 수 있습니다.'
        />
      </div>
    );
  } else if (pageNum === 5) {
    // 티켓 구매하기
    return (
      <div>
        <GuideBodyComponent
          img='images/guide_show1.png'
          icon=''
          title='공연 티켓 구매'
          body='관람하고자 하는 공연의 티켓을 구매하면서, 티켓을 NFT로 소장할 수 있습니다. 
티켓을 구매할 때 지갑의 SSF 금액을 소모하여 NFT도 같이 구매합니다. MetaMask에 연결되어 있어야 구매가 가능합니다. 
구매 후 나의 프로필에서 NFT를 확인할 수 있으며, 1~2분정도 시간이 걸릴 수도 있습니다. 
이러한 지연 시간은 SSAFY 네트워크 환경 상태에 따라 달라집니다.'
        />
        <GuideBodyComponent
          img='images/guide_purchase1.png'
          icon=''
          title='타인의 티켓 구매하기'
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
    // 티켓 판매하기 / 공연 등록
    return (
      <div>
        <GuideBodyComponent
          img='images/guide_ticket1.png'
          icon=''
          title='소유한 티켓 판매'
          body='소유중인 NFTicket을 다른이에게 판매할 수 있습니다. 다른 필요한 이에게 판매해보세요.'
        />
        <GuideBodyComponent
          img='images/guide_sell2.png'
          icon=''
          title='공연을 등록하여 티켓 판매'
          body='공연을 등록하여 입장권인 티켓을 판매할 수 있습니다.
공연 제목, 카테고리, 공연 장소, 공연 시간, 관람 연령, 공연 정보, 판매 기간, 좌석별 가격,
캐스팅 정보, 그리고 재판매 가능 여부를 설정하여 원작자에게 줄 로열티를 설정할 수 있습니다.'
        />
        <GuideBodyComponent
          img='images/guide_sell1.png'
          icon=''
          title='소유한 티켓 판매시 설정 가능한 옵션'
          body='가격, 판매 기간, 그리고 티켓에 대한 판매자의 설명을 설정할 수 있습니다.'
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
          icon='StorefrontIcon'
          title='티켓몰'
          body='마켓 페이지에 진입하시면, 다른 사용자들이 판매를 걸어놓은 NFTicket들을 볼 수 있습니다.
판매중인 NFTicket를 찾을 때 검색 기능과 분류 기능을 이용할 수 있습니다.
관련 티켓 내용은, 티켓 이미지를 클릭하여 세부 내용을 확인할 수 있습니다.'
        />
      </div>
    );
  } else if (pageNum === 7) {
    // 개인 정보 / 프로필
    return (
      <div>
        <GuideBodyComponent
          img='images/guide_profile2.png'
          icon=''
          title='개인정보'
          body='개인정보 페이지에서 자신의 닉네임, 자기소개 글, 연결된 지갑 계정을 확인할 수 있습니다.
또한, 닉네임, 자기소개, 프로필 이미지를 변경할 수 있습니다.'
        />
        <GuideBodyComponent
          img=''
          icon='PersonIcon'
          title='프로필'
          body='공연을 예매하여 티켓을 획득하거나, 타인의 티켓을 사들였을 때 나의 티켓에 보관됩니다.
판매 등록한 티켓은 판매 티켓 탭에, 등록한 공연이 있다면 등록 공연 탭에 표시됩니다.'
        />
      </div>
    );
  } else if (pageNum === 8) {
    // 나만의 티켓
    return (
      <div>
        <GuideBodyComponent
          img='images/guide_decorate1.png'
          icon=''
          title='나만의 티켓'
          body='티켓 꾸미기 사이트가 제공되어 본인의 티켓을 꾸미고 저장할 수 있습니다.
자체 티켓 꾸미기 페이지가 제공되며, 이미지 합성, 스티커 붙이기 등의 편집기능이 제공됩니다. 
편집을 완료한 후에는 저장하여 본인의 개성적인 티켓으로 소유할 수 있습니다.'
        />
      </div>
    );
  } else if (pageNum === 9) {
    // 티켓 전시관
    return (
      <div>
        <GuideBodyComponent
          img='images/guide_community0.png'
          title='전시관 접속 방법'
          body='커뮤니티 탭으로 이동하면 다음과 같은 페이지가 로드됩니다.
          이용 방법은 다음과 같습니다.
1. 닉네임은 계정 기본 닉네임으로 설정되지만, 변경하실 수 있습니다.
2. 나의 방으로 접속할 수 있습니다.
3. 방 찾기를 누르고, 타인의 지갑 주소나 계정 닉네임을 통해 타인의 방에 입장할 수 있습니다.
4. 커뮤니티에 접속할 수 있는 NFTicket을 소유한 상태라면, 특정 커뮤니티 룸에 접속할 수 있습니다.'
        />
        <GuideBodyComponent
          img='images/guide_community1.png'
          icon=''
          title='개인 전시관'
          body='프로필에 저장된 NFT를 개인 전시관에 게시하세요. 
다른 사용자가 회원님의 개인 룸에 접속하여 소유한 NFTicket들을 관람할 수 있습니다.
티켓에 가까이 접근하면 티켓에 상세 정보를 확인할 수 있습니다.'
        />
        <GuideBodyComponent
          img='images/guide_community3.png'
          icon=''
          title='조작법 확인'
          body='입장하면 귀여운 두부맨이 되어 방을 돌아다닐 수 있습니다.
조작법은 키보드의 ESC키를 누르면 확인하실 수 있습니다.'
        />
        <GuideBodyComponent
          img='images/guide_community4.png'
          title='채팅'
          body='같은 전시관안에 있는 이용자와 채팅으로 대화를 나눌 수 있습니다.'
        />
      </div>
    );
  } else if (pageNum === 10) {
    // 커뮤니티
    return (
      <div>
        <GuideBodyComponent
          img='images/guide_community2.png'
          icon=''
          title='커뮤니티'
          body='특정 공연의 티켓을 소유하여야만 입장할 수 있는 커뮤니티가 있습니다.
이 곳에서 같은 공연을 즐긴 사람들과 인연을 맺고, 공연의 팬임을 커뮤니티에 접속하여 인증하세요.
그리고 누가 더 열정적인 팬인지 확인해보세요.'
        />
        <GuideBodyComponent
          img=''
          icon='AccessibilityNewIcon'
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
          icon='UploadIcon'
          title='민팅'
          body='NFT를 발행하는 것을 뜻합니다.'
        />
        <GuideBodyComponent
          img=''
          icon='Filter1Icon'
          title='에디션'
          body='NFT의 고유한 구분 단위입니다. 예를들어 총 발행 수가 30개인 NFT의 에디션 #1인 경우, 30개 중 첫번째 에디션을 의미합니다.'
        />
        <GuideBodyComponent
          img=''
          icon='CreateIcon'
          title='크리에이터'
          body='NFT를 최초로 발행한 창작자이며, NFTicket 에서는 컨텐츠 제공자를 의미합니다.'
        />
        <GuideBodyComponent
          img=''
          icon='FileCopyIcon'
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
