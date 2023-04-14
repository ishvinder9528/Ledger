import React, { useContext } from "react";
import ShopContext from "../contexts/shop/shopContext";

const Alert = () => {
  const { alert } = useContext(ShopContext);
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
      {alert && (
        <>
          <div
            className={`alert alert-${alert.type} alert-dismissable fade show`}
            role="alert"
          >
            <strong>{capitalize(alert.type)}</strong>: {alert.msg}
          </div>
        </>
      )}
    </div>
  );
};

export default Alert;
