import React, { useContext, useEffect } from "react";
import BillContext from "../../contexts/bill/billContext";
import { useNavigate } from "react-router-dom";
import Bills from "./Bills";
import AddBillForm from "./AddBillForm";
import EditBillForm from "./EditBillFrom";

const BillsPage = () => {
  const context = useContext(BillContext);

  const {
    setLoaded,
    shopName,
    isEdit,
    setIsEdit,
    shopId,
    setEditBillData,
    setBillsData,
  } = context;

  const navigate = useNavigate();

  useEffect(() => {
    if (shopName === "" && shopId === "") {
      navigate("/shop");
    }
  });

  return (
    <div className="mt-5">
      <div className="row my-4">
        <div className="col-3 col-md-3">
          <button
            className="btn btn-outline-warning mx-2"
            onClick={() => {
              navigate("/shop");
              setLoaded(false);
              setBillsData([]);
              setIsEdit({
                value: false,
                id: "",
              });
              setEditBillData({});
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
        {!isEdit.value ? (
          <div className="col-md-4">
            <AddBillForm />
          </div>
        ) : (
          <div className="col-md-4">
            <EditBillForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default BillsPage;
