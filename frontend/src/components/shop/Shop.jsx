import React from "react";
import ShopTable from "./ShopTable";
import { useNavigate } from "react-router-dom";
import AddShop from "./AddShop";
const Shop = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-5">
      <div className="row my-4">
        <div className="col-3 col-md-3">
          <button className="btn btn-outline-warning mx-2">
            <i
              className="fa-solid fa-chevron-left fa-lg"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            ></i>
          </button>
        </div>
        <div className="col-6 col-md-6 ">
          <h1 className="text-center text-warning">
            Welcome <span style={{ color: "grey" }}>To</span> Ledger
          </h1>
        </div>
        <div className="col-3 col-md-3"></div>
      </div>
      <div className="row mb-5">
        <div className="col-md-8 ">
          <ShopTable />
        </div>
        <div className="col-md-4">
            <AddShop/>
        </div>
      </div>
    </div>
  );
};

export default Shop;
