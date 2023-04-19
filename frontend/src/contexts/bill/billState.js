import React, { useState, useEffect } from "react";
import BillContext from "./billContext";
const BillState = (props) => {
  const [shopId, setShopId] = useState("");
  const [billsData, setBillsData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [alert, setAlert] = useState(null);
  const [shopName, setShopName] = useState("");
  const [isEdit, setIsEdit] = useState({ value: false, id: "" });
  const [editBillData, setEditBillData] = useState({});
  const [editBillLoaded, setEditBillLoaded] = useState(false);
  const [billId, setBillId] = useState("");
  const [bill_Id, setBill_Id] = useState("");
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

  //get all bills
  const getAll = async () => {
    try {
      const response = await fetch(`${host}/bills/allbills`, {
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
      console.log(shopid);
      const response = await fetch(`${host}/bills/add/${shopid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bill),
      });
      console.log(response);
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
  function dateIsValid(date) {
    return !Number.isNaN(new Date(date).getTime());
  }
  //   Get the Particular Bill Data
  const getBillData = async (shopid, billid) => {
    try {
      const response = await fetch(`${host}/bills/${shopid}/bill/${billid}`, {
        method: "GET",
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const formattedDate = new Date(data.bill.date);
        console.log(dateIsValid(formattedDate));
        console.log(formattedDate);
        setEditBillData({
          ...editBillData,
          ...data.bill,
        });
        if (editBillData.length !== 0) {
          setEditBillLoaded(true);
          showAlert("Bill Data Loaded to Form", "success");
        }
      } else {
        showAlert("Opps, Something went wrong", "danger");
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
          getAll,
          isEdit,
          setIsEdit,
          editBillData,
          setEditBillData,
          getBillData,
          setEditBillLoaded,
          editBillLoaded,
          billId,
          setBillId,
          setBill_Id,
          bill_Id,
        }}
      >
        {props.children}
      </BillContext.Provider>
    </>
  );
};

export default BillState;
