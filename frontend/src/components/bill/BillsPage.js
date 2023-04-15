import React, { useContext } from "react";
import BillContext from "../../contexts/bill/billContext";
import { useNavigate } from "react-router-dom";
import Bills from "./Bills";
import ShopContext from "../../contexts/shop/shopContext";

const BillsPage = () => {
  const context = useContext(BillContext);
  const { billId, setLoaded,setBillId } = context;
  const shopContext = useContext(ShopContext);
  const {shopName} = shopContext;
  const navigate = useNavigate();

  console.log(billId);
  return (
    <div className="mt-5">
      <div className="row my-4">
        <div className="col-3 col-md-3">
          <button
            className="btn btn-outline-warning mx-2"
            onClick={() => {
              navigate("/shop");
              setLoaded(false);
              setBillId("");
            }}
            style={{ cursor: "context-menu" }}
          >
            <i
              className="fa-solid fa-chevron-left fa-lg p-3"
              style={{ cursor: "context-menu" }}
            ></i>
          </button>
        </div>
        <div className="col-6 col-md-6 ">
          <h1 className="text-center text-warning">
            {shopName}'s <span style={{ color: "grey" }}>Bill</span>
          </h1>
        </div>
        <div className="col-3 col-md-3"></div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <Bills />
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default BillsPage;
