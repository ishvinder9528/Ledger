import React, { useContext } from "react";
import ShopTable from "./ShopTable";
import { useNavigate } from "react-router-dom";
import AddShop from "./AddShop";
import ShopContext from "../contexts/shop/shopContext";
import EditShop from "./EditShop";

const Shop = () => {
  const navigate = useNavigate();
  const context = useContext(ShopContext);
  const { isEdit } = context;
  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-3">
          <i
            className="fa-solid fa-chevron-left fa-2x mx-3 text-warning"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            BACK
          </i>
        </div>
        <div className="col-6">
          <h1 className="text-center text-warning my-4">Welcome To Ledger</h1>
        </div>
        <div className="col-3"></div>
      </div>
      <div className="row" style={{ margin: 0, padding: 0 }}>
        <div className="col-8 " style={{ margin: "2rem 0 0 0", padding: 0 }}>
          <ShopTable />
        </div>
        <div className="col-4" style={{ margin: "2rem 0 0 0 ", padding: 0 }}>
          {isEdit.value ? <EditShop id={isEdit.id}/> : <AddShop />}
        </div>
      </div>
    </div>
  );
};

export default Shop;
