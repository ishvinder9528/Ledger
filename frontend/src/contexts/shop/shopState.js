import React, { useState } from "react";
import ShopContext from "./shopContext";
import Alert from "../../components/Alert";

const ShopState = (props) => {
  const host = "http://localhost:5000";
  const [shops, setShops] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [alert, setAlert] = useState(null);
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
      const response = await fetch(`${host}/shops/allshops`, {
        method: "GET",
      });
      let data = await response.json();
      setShops(data.shopData);
      setLoaded(true);
    } catch (error) {
      console.log("Opps, Something went wrong", error);
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
        console.log(data);
        setShops(shops.concat(data));
        console.log(shops);
        showAlert("Shop Added Successfully!", "success");
      } else {
        showAlert("GST number already exists", "danger");
      }
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  return (
    <ShopContext.Provider value={{ shops, getShops, loaded, setLoaded ,addShop}}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopState;
