import React, { useContext } from "react";
import ShopContext from "../contexts/shop/shopContext";
import BillContext from "../contexts/bill/billContext";

const Alert = () => {
  const { alert: shopAlert } = useContext(ShopContext);
  const { alert: billAlert } = useContext(BillContext);
  //   console.log(alert);
  const capitalize = (word) => {
    // console.log('word:', word); // add this line to see what the value of `word` is
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{ height: "50px" }}>
      {[shopAlert, billAlert].map(
        (alert) =>
          alert && (
            <div
              key={alert.msg}
              className={`alert alert-${alert.type} alert-dismissable fade show`}
              role="alert"
            >
              <strong>{capitalize(alert.msg)}</strong>
            </div>
          )
      )}
    </div>
  );
};

export default Alert;
