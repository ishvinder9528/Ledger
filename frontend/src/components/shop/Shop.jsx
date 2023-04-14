import React, { useContext } from "react";
import ShopTable from "./ShopTable";
import { useNavigate } from "react-router-dom";
import AddShop from "./AddShop";
import EditShop from "./EditShop";
import ShopContext from "../../contexts/shop/shopContext";
const Shop = () => {
  const context = useContext(ShopContext);
  const { isEdit } = context;
  const navigate = useNavigate();
  return (
    <div className="mt-5">
      <div className="row my-4">
        <div className="col-3 col-md-3">
          <button
            className="btn btn-outline-warning mx-2"
            onClick={() => navigate("/")}
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
          {isEdit.value ? <EditShop /> : <AddShop />}
        </div>
      </div>
    </div>
  );
};

export default Shop;
