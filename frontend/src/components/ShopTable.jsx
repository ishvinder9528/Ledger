import React, { useContext, useEffect } from "react";
import ShopContext from "../contexts/shop/shopContext";
import ShopTableData from "./ShopTableData";

const ShopTable = (props) => {
  const { value } = props;
  const context = useContext(ShopContext);
  const { getShops, shops } = context;

  useEffect(() => {
    getShops();
    console.log(shops);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(shops);

  return (
    <div className="container ">
      <section>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">GST No.</th>
              <th scope="col">Location</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Pending Amount</th>
            </tr>
          </thead>
          <tbody>
            {value ? (
              shops.length > 0 ? (
                shops.slice(0, value).map((shop) => {
                  return <ShopTableData key={shop._id} shop={shop} />;
                })
              ) : (
                <tr>
                  <td colSpan="5">No data found</td>
                </tr>
              )
            ) : (
              shops.length > 0 ? (
                shops.map((shop) => {
                  return <ShopTableData key={shop._id} shop={shop} />;
                })
              ) : (
                <tr>
                  <td colSpan="5">No data found</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ShopTable;
