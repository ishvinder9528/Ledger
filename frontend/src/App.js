import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ShopState from "./contexts/shop/shopState";
import Shop from "./components/shop/Shop";
import Alert from "./components/Alert";
import BillsPage from "./components/bill/BillsPage";
import BillState from "./contexts/bill/billState";
import "react-datepicker/dist/react-datepicker.css";
import AllBills from "./components/bill/AllBills";
function App() {
  return (
    <>
      <ShopState>
        <BillState>
          <BrowserRouter>
            <Navbar />
            <Alert />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/shop" element={<Shop />} />
              <Route exact path="/bill" element={<BillsPage />} />
              <Route exact path="/all" element={<AllBills />} />
            </Routes>
          </BrowserRouter>
        </BillState>
      </ShopState>
      <div className="App"></div>
    </>
  );
}

export default App;
