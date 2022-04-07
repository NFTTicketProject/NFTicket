import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import styled from "styled-components";
import swal from "sweetalert2";

// routes
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Decorate from "./pages/Decorate";
import Page4 from "./pages/Page4";
import Community from "./pages/Community";
// import MyAnimal from "./pages/MyAnimal";
// import SaleAnimal from "./pages/SaleAnimal";
// import Mint from "./pages/Mint";
import Guide from "./pages/Guide";
import Detail from "./pages/Detail";
// import Profile from "./pages/Profile";
import TicketDetail from "./pages/TicketDetail";
import TicketDetailHandover from "./pages/TicketDetailHandover";
import NotFound from "./pages/NotFound";
import "./App.css";
import MyPage from "./pages/MyPage";
import Settings from "./components/Settings";
import ScheduleManager from "./pages/ScheduleManager";
import Purchase from "./pages/Purchase";
import Show from "./pages/Show";
import Market from "./pages/Market";
import ShowDetail from "./pages/ShowDetail";
import ShowPublish from "./pages/ShowPublish";
import SelectSeat from "./pages/SelectSeat";

const TotalWrapDiv = styled.div`
  position: relative;
  min-height: 120vh;
`;

const ContentWrapDiv = styled.div`
  padding-bottom: 12rem;
`;

function App() {
  const navigate = useNavigate()
  const [account, setAccount] = useState("");
  const getAccount = async () => {
    try {
      // metamask가 설치되어있으면 아래 코드 실행
      if (window.ethereum) {
      //   swal.fire ({
      //   icon: 'error',
      //   title: '지갑을 연결해주세요.',
      // })
        // navigate("/MyPage")
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      } else {
        // metamask가 설치되어있지 않은 경우 alert
        alert("Install Metamask!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // // 실행 시 getAccount 함수 실행
  // useEffect(() => {
  //   getAccount();
  // }, [account]);
  return (
    <TotalWrapDiv>
      <ContentWrapDiv>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Redux1' element={<Page1 />} />
          <Route path='/Redux2' element={<Page2 />} />
          <Route path='/decorate/:ticketId' element={<Decorate />} />
          <Route path='/Wallet%20Info' element={<Page4 />} />
          <Route path='/Community' element={<Community />} />
          <Route path='/Guide' element={<Guide />} />
          <Route path='/Detail' element={<Detail />} />
          <Route path='/Detail/:showScheduleAddress' element={<ShowDetail getAccount={getAccount}/>} />
          <Route
            path='/Schedule%20Manager'
            element={<ScheduleManager />}
          ></Route>
          <Route path='/MyPage' element={<MyPage />} />
          <Route path='/MyPage/Settings' element={<Settings />} />
          <Route path='/Ticket/:ticketId' element={<TicketDetail getAccount={getAccount}/>} />
          <Route ></Route>
          {/* <Route path="/Ticket/:showScheduleAddress" element={<TicketDetail />} /> */}

          <Route
            path='/Detail-Handover/:ticketId'
            element={<TicketDetailHandover />}
          />
          <Route path='/Barcode' element={<Page4 />} />
          <Route path='/Purchase' element={<Purchase />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/Show' element={<Show />} />
          <Route path='/Market' element={<Market />} />
          <Route path='/ShowPublish' element={<ShowPublish getAccount={getAccount}/>} />
          <Route
            path='/SelectSeat/:showScheduleAddress'
            element={<SelectSeat />}
          />
        </Routes>
      </ContentWrapDiv>
      <Footer></Footer>
    </TotalWrapDiv>
  );
}

export default App;
