import React, { useState } from "react";
import BillContext from "./billContext";
const BillState = (props) => {
  const [shopId, setShopId] = useState("");
  const [billsData, setBillsData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [alert, setAlert] = useState(null);
  const [shopName, setShopName] = useState("");
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

  //   Add Bill to Shop
  const addBill = async (shopid, bill) => {
    try {
      const response = await fetch(`${host}/bills/add/${shopid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bill),
      });
      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(billsData)) {
            setBillsData(billsData.concat(data));
          } else {
            setBillsData([data]);
          }
        showAlert("Bill added Successfully", "success");
      }
    } catch (error) {
      console.log(error);
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  return (
    <>
      <BillContext.Provider
        value={{
          shopId,
          setShopId,
          billsData,
          getBill,
          loaded,
          setLoaded,
          showAlert,
          alert,
          deleteBill,
          addBill,
          shopName,
          setShopName,
        }}
      >
        {props.children}
      </BillContext.Provider>
    </>
  );
};

export default BillState;
