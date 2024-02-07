import React, { useState } from "react";
import ShopContext from "./shopContext";
// import axios from "axios";
const ShopState = (props) => {
  const host = "http://localhost:5000";
  const [shops, setShops] = useState({});
  const [alert, setAlert] = useState(null);
  const [isAddShopFields, SetAddShopFields] = useState(false);
  const [isEdit, setIsEdit] = useState({
    value: false,
    id: null,
  });
  const [editShopData, setEditShopData] = useState({});
  const showAlert = (message, type) => {
    // console.log("showAlert:", message, type); // add this line to check the parameters
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
      const response = await fetch(`${host}/shops/allshops`, {
        method: "GET",
      });
      if (response.ok) {
        let data = await response.json();
        setShops(data.shopData);
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

        setShops(shops.concat(data));
        showAlert("Shop Added Successfully!", "success");
      } else {
        showAlert("GST number already exists", "danger");
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
      }
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };
  // const deleteShop = async (id) => {
  //   await axios
  //     .delete(`${host}/shops/delete/${id}`)
  //     .then((response) => {
  //       console.log(response);
  //       const newShop = shops.filter((shop) => {
  //         return shop._id !== id;
  //       });
  //       setShops(newShop);
  //       showAlert("Shop Deleted Successfully!", "success");
  //     })
  //     .catch((error) => {
  //       showAlert("Opps, Something went wrong", "danger");
  //     });
  // };

  // get the particular shop data
  const getShopData = async (id) => {
    try {
      const response = await fetch(`${host}/shops/${id}`, {
        method: "GET",
      });
      if (response.ok) {
        const shopData = await response.json();
        // console.log(shopData.shop);
        setEditShopData(shopData.shop);
      }
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // Update the shop data
  const updateShop = async (data, id) => {
    console.log(data, id);
    const request = await fetch(`${host}/shops/${id}`, {
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
        if (element._id === id) {
          newShops[i] = data;
          break;
        }
      }
      setShops(newShops);
      showAlert("Shop Data Updated Successfully", "success");
    }
  };

  return (
    <ShopContext.Provider
      value={{
        shops,
        getShops,
        alert,
        setAlert,
        showAlert,
        isAddShopFields,
        SetAddShopFields,
        addShop,
        deleteShop,
        isEdit,
        setIsEdit,
        editShopData,
        getShopData,
        updateShop,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopState;
