import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Redux1' element={<Page1 />} />
        <Route path='/Redux2' element={<Page2 />} />
        <Route path='/Toast%20UI' element={<Page3 />} />
        <Route path='/Wallet%20Info' element={<Page4 />} />
        <Route path='/Community' element={<Page5 />} />
      </Routes>
    </div>
  );
}

export default App;
