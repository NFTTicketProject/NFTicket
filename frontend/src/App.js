import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/PageOne' element={<PageOne />} />
        <Route path='/PageTwo' element={<PageTwo />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
