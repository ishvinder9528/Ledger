import React from "react";
import loading from "./loading.gif";
const Spinner = () => {
  return (
    <div className=" align-content-center">
      <img
        src={loading}
        alt="loading icon"
        style={{ width: "8rem", height: "8rem" }}
      />
      <h5>Please wait Loading....</h5>
    </div>
  );
};

export default Spinner;
