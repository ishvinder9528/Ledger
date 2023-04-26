import React, { useState } from "react";
import ShopContext from "./shopContext";

const ShopState = (props) => {
  const host = "https://ledgerbackend.onrender.com";
  const [shops, setShops] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shopName, setShopName] = useState("");

  const [isEdit, setIsEdit] = useState({
    value: false,
    id: "",
  });
  const [editShopData, setEditShopData] = useState({
    name: "",
    gstno: "",
    location: "",
    phone: "",
    pendingAmount: "",
  });
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // GET all shops from backend
  const getShops = async () => {
    try {
      // console.log("it loads me");
      const response = await fetch(`${host}/shops/allshops`, {
        method: "GET",
      });
      if (response.ok) {
        let data = await response.json();
        setShops(data.shopData);
        setLoaded(true);
      }
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // Add Shop
  const addShop = async (shop) => {
    try {
      const response = await fetch(`${host}/shops/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shop),
      });
      if (response.ok) {
        let data = await response.json();
        console.log("New Shop", data);
        setShops(shops.concat(data));
        console.log("Total Shop", shops);
        showAlert("Shop Added Successfully!", "success");
        getShops();
      } else {
        showAlert(
          "Name and GST Number Should be Unique and Required",
          "danger"
        );
      }
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // delete the shop
  const deleteShop = async (id) => {
    try {
      const response = await fetch(`${host}/shops/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const newShop = shops.filter((shop) => {
          return shop._id !== id;
        });
        setShops(newShop);
        showAlert("Shop Deleted Successfully!", "success");
        getShops();
      }
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // get the particular shop data
  const getShopData = async (id) => {
    try {
      const response = await fetch(`${host}/shops/${id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.shop);
        setEditShopData(data.shop);
      }
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // Update the shop data
  const updateShop = async (data) => {
    try {
      console.log(data);
      const request = await fetch(`${host}/shops/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (request.ok) {
        const newShops = JSON.parse(JSON.stringify(shops));
        for (let i = 0; i < newShops.length; i++) {
          const element = newShops[i];
          if (element._id === data._id) {
            newShops[i] = data;
            break;
          }
        }
        setShops(newShops);
        showAlert("Shop Data Updated Successfully", "success");
        getShops();
      }
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  return (
    <ShopContext.Provider
      value={{
        shops,
        getShops,
        loaded,
        setLoaded,
        addShop,
        alert,
        deleteShop,
        getShopData,
        updateShop,
        isEdit,
        setIsEdit,
        editShopData,
        setEditShopData,
        showModal,
        setShowModal,
        shopName,
        setShopName,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopState;
