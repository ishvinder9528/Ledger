import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ShopState from "./contexts/shop/shopState";
import ShopTable from "./components/shop/ShopTable";
function App() {
  return (
    <>
      <ShopState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/shop" element={<ShopTable />} />
          </Routes>
        </BrowserRouter>
      </ShopState>
      <div className="App"></div>
    </>
  );
}

export default App;
