import React, { useState } from "react";
import BillContext from "./billContext";
const BillState = (props) => {
  const [billId, setBillId] = useState("");
  const [billsData, setBillsData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [alert, setAlert] = useState(null);
  const host = "http://localhost:5000";
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // Get All bill of particular shop
  const getBill = async (id) => {
    try {
      const response = await fetch(`${host}/bills/allbills/${id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setBillsData(data.bills);
        console.log(billsData);
        setLoaded(true);
      }
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // Delete the Bill of particular Shop
  const deleteBill = async (shopid, billid) => {
    try {
      const response = await fetch(`${host}/bills/${shopid}/delete/${billid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = billsData.filter((bill) => bill._id !== billid);
        setBillsData(data);
        showAlert("Bill deleted Successfully", "success");
      }
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  return (
    <>
      <BillContext.Provider
        value={{
          billId,
          setBillId,
          billsData,
          getBill,
          loaded,
          setLoaded,
          showAlert,
          alert,
          deleteBill
        }}
      >
        {props.children}
      </BillContext.Provider>
    </>
  );
};

export default BillState;
