# 🐢 NFTicket - 티켓의 추억을 부여하다

![타이틀이미지](docs/images/title.jpg)


## NFTicket 링크(모바일 화면) : [https://tupli.kr](https://tupli.kr/) [수정필요]
## 소개 영상 보기 : [UCC 링크](https://youtu.be/WU3tIIOS0Ec) [수정필요]

## 💜 프로젝트 진행 기간
2022.02.21(월) ~ 2022.04.08(금) (46일간 진행)  
SSAFY 6기 2학기 특화프로젝트 - NFTicket

</br>

## 🎵 NFTicket - 배경 [수정필요]
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

</br>

## 💜 NFTicket - 개요 [수정필요]
*- The quick brown fox jumps over the lazy dog -*  

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

</br>

## 💜 주요 기능 [수정필요]
---
- ### Lorem ipsum
    - consectetur adipiscing elit
    - sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
    - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
    - nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    <br/>
- ### Lorem ipsum
    - consectetur adipiscing elit
    - sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
    - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
    <br/>
- ### Lorem ipsum
    - consectetur adipiscing elit
    - sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
    - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
- ### 스마트 컨트랙트에서 거래
    - 이더리움 네트워크 내 스마트 컨트랙트를 통해 NFT 토큰(티켓) 거래
    - middle-man에 대한 의존성 제거
    - 이더리움 네트워크 내 참여 노드들에 의해 거래 검증
</br>

## ✔ 주요 기술
---

**Backend - Express.js**
- Visual Studio Code
- Node.ks 16.14
- PRISMA 2
- ethers 5.6.2
- dotenv
- morgan
- winston
- MariaDB

**BlockChain - Ethereum**
- Solidity 0.4.22 < 0.9.0
- openzeppelin/contracts
- Truffle

**Storage**
- IPFS
- IPFS-Cluster

**Frontend  [수정 필요]**
- Visual Studio Code IDE
- Vue 2.6.11
- Vuetify 2.4.0
- Vuex 3.4.0
- Webstomp-Client 1.2.6
- Sock.js-Client 1.5.2
- Firebase 9.6.6
- sweetalert2 11.3.10

**CI/CD**
- AWS EC2
- Jenkins
- NGINX
- SSL
- Docker
- Portainer

## ✔ 프로젝트 구조
---
![프로젝트 구조](docs/images/architecture.jpg)

## ✔ 프로젝트 파일 구조
---
### Frontend
```
NFTicket
├── README.md
├── api
│   └── swagger.json
├── app.js
├── logs
│   ├── NFTicket_20220328.log
│   ├── NFTicket_20220329.log
│   ├── NFTicket_20220330.log
│   ├── NFTicket_20220331.log
│   └── NFTicket_20220401.log
├── package-lock.json
├── package.json
├── prisma
│   └── schema.prisma
├── public
│   ├── favicon.ico
│   ├── images
│   │   └── bonobono.jpg
│   └── stylesheets
│       └── main.css
├── routes
│   ├── controllers
│   │   ├── account.js
│   │   ├── profile.js
│   │   ├── role.js
│   │   ├── sale.js
│   │   ├── show.js
│   │   └── staff.js
│   └── index.js
├── services
│   ├── auth.js
│   ├── profile.js
│   ├── role.js
│   ├── sale.js
│   ├── show.js
│   ├── staff.js
│   └── text_generater.js
├── start.sh
└── utils
    ├── prisma.js
    ├── swagger.js
    └── winston.js
```
### BlockChain
```
NFTicket
├── README.md
├── contracts
│   ├── IResellPolicy.sol
│   ├── ITicketClass.sol
│   ├── Migrations.sol
│   ├── MyTicket.sol
│   ├── ShowSchedule.sol
│   ├── ShowScheduleManager.sol
│   ├── SsafyToken.sol
│   ├── TicketSale.sol
│   └── TicketSaleManager.sol
├── extra
│   ├── TicketClass.sol
│   ├── sol.js
│   └── ssafy_net.js
├── migrations
│   └── 1_initial_migration.js
├── package.json
└── truffle-config.js

```

## ✔ 협업 툴
---
- Gitlab
- Notion
- Gether Town
- JIRA
- Slack
- MatterMost
- Webex
- Code With Me
- Visual Studio Live Share
- Swagger

## ✔ 협업 환경
---
- Gitlab
  - 코드 버전 관리
  - 이슈 발행, 해결을 위한 토론
  - MR시, 팀원이 코드리뷰를 진행하고 피드백 게시
- JIRA
  - 매주 목표량을 설정하여 Sprint 진행
  - 업무의 할당량을 정하여 Story Point를 설정하고, In-Progress -> Done 순으로 작업
  - 소멸 차트를 통해 프로젝트 진행도 확인
- 회의
  - Gether Town 아침회의 진행, 전날 목표 달성량과 당일 할 업무 브리핑
  - 각자 위치에서 건네야 할 말이 생기면 팀원의 위치로 이동하여 전달
  - 빠른 소통과 신속한 대응 가능
- Notion
  - 회의가 있을때마다 회의록을 기록하여 보관
  - 회의가 길어지지 않도록 다음날 제시할 안건을 미리 기록
  - 기술확보 시, 다른 팀원들도 추후 따라할 수 있도록 보기 쉽게 작업 순서대로 정리
  - 컨벤션 정리
  - 간트차트 관리
  - 스토리보드, 스퀀스다이어그램, 기능명세서 등 모두가 공유해야 하는 문서 관리
- Slack
  - 현재 작업 상황 공유
  - 기능 수정 공지
  - 투표 진행
- Visual Studio Live Share
  - 실시간으로 의사소통하며 받으며 함께 코딩
  - 피드백의 빠른 반영 가능
  - 집단지성을 이용해 코드의 신뢰성과 작업속도 향상

## ✔ 팀원 역할 분배
---
![역할 배분](docs/images/crew.jpg)

## ✔ 프로젝트 산출물 [수정 필요]
---
- [기능명세서](docs/docs/기능명세서.md)
- [디자인&컨셉기획](./docs/디자인&컨셉기획.md) [수정 필요]
- [스토리보드](./docs/스토리보드.md) [수정 필요]
- [시퀀스다이어그램](./docs/시퀀스다이어그램.md) [수정 필요]
- [아키텍처](docs/docs/아키텍처.md)
- [와이어프레임](docs/docs/와이어프레임.md)
- [컨벤션](./docs/컨벤션.md) [수정 필요]
- [API](docs/docs/apidocs.pdf)
- [ERD](docs/docs/ERD.md)
- [회의록](./docs/회의록.md) [수정 필요]
- [시스템기술서](./docs/TUPLI_시스템_기술서.docx) [수정 필요]
- [명세기술서](./docs/TUPLI_명세_기술서.docx) [수정 필요]

## ✔ 프로젝트 결과물 [수정 필요]
- [포팅메뉴얼](./exec/TUPLI_포팅_메뉴얼.docx) [수정 필요]
- [중간발표자료](docs/docs/NFTicket_midterm.pdf)
- [최종발표자료](./ppt/TUPLI_최종발표.pptx) [수정 필요]


## 🎵 NFTicket 서비스 화면 [수정 필요]
---

### 메인화면 [수정 필요]
- 최신순으로 업로드된 플레이리스트 or 플레이룸 or 게시글 정보를 로드합니다.
- 무한스크롤이 적용됩니다.

<img width="30%" src="https://user-images.githubusercontent.com/55949647/154587375-cfef4162-d404-41fd-9d28-39712f2cf5b1.gif"/>

