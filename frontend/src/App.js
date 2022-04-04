import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

// routes
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
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

function App() {
  // const [account, setAccount] = useState("");
  // const getAccount = async () => {
  //   try {
  //     // metamask가 설치되어있으면 아래 코드 실행
  //     if (window.ethereum) {
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });

  //       // account에 지갑 주소 넣어주기
  //       setAccount(accounts[0]);
  //     } else {
  //       // metamask가 설치되어있지 않은 경우 alert
  //       alert("Install Metamask!");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // // 실행 시 getAccount 함수 실행
  // useEffect(() => {
  //   getAccount();
  // }, [account]);
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Redux1" element={<Page1 />} />
        <Route path="/Redux2" element={<Page2 />} />
        <Route path="/Toast%20UI" element={<Page3 />} />
        <Route path="/Wallet%20Info" element={<Page4 />} />
        <Route path="/Community" element={<Page5 />} />
        <Route path="/Guide" element={<Guide />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Detail/:showScheduleAddress" element={<ShowDetail />} />
        <Route path="/Schedule%20Manager" element={<ScheduleManager />}></Route>
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyPage/Settings" element={<Settings />} />
        <Route path="/Ticket/:ticketId" element={<TicketDetail />} />
        {/* <Route path="/Ticket/:showScheduleAddress" element={<TicketDetail />} /> */}

        <Route path="/Detail-Handover/:ticketId" element={<TicketDetailHandover />} />
        <Route path="/Barcode" element={<Page4 />} />
        <Route path="/Purchase" element={<Purchase />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/Show" element={<Show />} />
        <Route path="/Market" element={<Market />} />
        <Route path="/ShowPublish" element={<ShowPublish />} />
      </Routes>
    </div>
  );
}

export default App;
