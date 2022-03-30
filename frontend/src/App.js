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
import NotFound from "./pages/NotFound";
import "./App.css";
import MyPage from "./pages/MyPage";
import Settings from "./components/Settings";
import Purchase from "./pages/Purchase";

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
        {/* <Route path="/Wansoo" element={<Page4 />} /> */}
        {/* <Route path="/Mint" element={<Mint />} /> */}
        {/* <Route path="/My%20Animal" element={<MyAnimal account={account} />} />
        <Route path="/Sale%20Animal" element={<SaleAnimal account={account} />} /> */}
        <Route path="/Guide" element={<Guide />} />
        <Route path="/Detail" element={<Detail />} />
        {/* <Route path='/Profile' element={<Profile />} /> */}
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyPage/Settings" element={<Settings />} />
        <Route path="/Ticket-Detail" element={<TicketDetail />} />
        <Route path="/Barcode" element={<Page4 />} />
        <Route path="/Purchase" element={<Purchase />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
