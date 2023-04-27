import React, { useState } from "react";
import BillContext from "./billContext";
const BillState = (props) => {
  const [shopId, setShopId] = useState("");
  const [billsData, setBillsData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [alert, setAlert] = useState(null);
  const [shopName, setShopName] = useState("");
  const [isEdit, setIsEdit] = useState({ value: false, id: "" });
  const [editBillData, setEditBillData] = useState({});
  const [billId, setBillId] = useState("");
  const [bill_Id, setBill_Id] = useState("");
  const [billItems, setBillItems] = useState([]);
  const [billItemLoaded, setBillItemLoaded] = useState(false);
  const host = "https://ledgerbackend.onrender.com";
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
      const response = await fetch(`${host}/bills/allbill/${id}`, {
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
        getBill(shopId)
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
          ...data.bill,
        });
        if (editBillData.length !== 0) {
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

  // edit the bill details
  const editBill = async (shopid, billid, bill) => {
    try {
      const response = await fetch(`${host}/bills/${shopid}/edit/${billid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bill),
      });
      console.log(response);
      if (response.ok) {
        const bills = JSON.parse(JSON.stringify(billsData));
        for (let index = 0; index < bills.length; index++) {
          const element = bills[index];
          if (element._id === billid) {
            bills[index] = bill;
            break;
          }
        }
        setBillsData(bills);
        showAlert("Bill Updated Successfully", "success");
      }
    } catch (error) {
      console.log(error);
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // Get all BillItems from Particular Bill
  const getBillItems = async (shopid, billid) => {
    try {
      const response = await fetch(
        `${host}/bills/${shopid}/billitems/${billid}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.billItems);
        setBillItems(data.billItems);
        setBillItemLoaded(true);
      }
    } catch (error) {
      console.log(error);
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // Add billitems to the particular bill of particular shop
  const addBillItem = async (shopid, billid, data) => {
    try {
      const response = await fetch(`${host}/bills/${shopid}/add/${billid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("response=>", response);
      console.log("data=>", data);
      if (response.ok) {
        const billitem = await response.json();

        if (Array.isArray(billItems)) {
          setBillItems(billItems.concat(billitem));
        } else {
          setBillItems([billitem]);
        }
        showAlert("Bill added Successfully", "success");
      } else {
      }
    } catch (error) {
      console.log(error);
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // Delete a bill item from the particular bill of particular shop
  const deleteBillItem = async (shopid, billid, billitemid) => {
    try {
      const response = await fetch(
        `${host}/bills/${shopid}/${billid}/delete/${billitemid}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const data = billItems.filter(
          (billitem) => billitem._id !== billitemid
        );
        setBillItems(data);
        showAlert("Bill deleted Successfully", "success");
      }
    } catch (error) {
      console.log(error);
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // get all billItems without shopid
  const getBillItemsWS = async (billid) => {
    try {
      const response = await fetch(
        `${host}/bills/billitems/${billid}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.billItems);
        setBillItems(data.billItems);
        setBillItemLoaded(true);
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
          setBillsData,
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
          billId,
          setBillId,
          setBill_Id,
          bill_Id,
          billItems,
          setBillItems,
          getBillItems,
          setBillItemLoaded,
          billItemLoaded,
          editBill,
          addBillItem,
          deleteBillItem,
          getBillItemsWS
        }}
      >
        {props.children}
      </BillContext.Provider>
    </>
  );
};

export default BillState;
