import React, { useState } from "react";
import ShopContext from "./shopContext";
const ShopState = (props) => {
  const host = "http://localhost:5000";
  const [shops, setShops] = useState({});

  // GET all shops from backend
  const getShops = async () => {
    try {
      const response = await fetch(`${host}/shops/allshops`, {
        method: "GET",
      });
      let data = await response.json();
    //   console.log("hii");
    //   console.log(data);
      setShops(data.shopData)
    } catch (error) {
        console.log("Opps, Something went wrong", error);
    }
  };

  return (
    <ShopContext.Provider value={{shops,getShops}}>{props.children}</ShopContext.Provider>
  );
};

export default ShopState;
