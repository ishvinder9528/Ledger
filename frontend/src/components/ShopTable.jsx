import React, { useContext, useEffect } from "react";
import ShopContext from "../contexts/shop/shopContext";
import ShopTableData from "./ShopTableData";
import { useLocation } from "react-router-dom";

const ShopTable = (props) => {
  const { value } = props;
  const context = useContext(ShopContext);
  const { getShops, shops } = context;
  let location = useLocation();
  // console.log(location.pathname);
  useEffect(() => {
    getShops();
    // console.log(shops);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shops]);

  // console.log(shops);

  return (
    <div className={` mx-1 `}>
      <section>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col" className=" text-bg-warning">
                Name
              </th>
              <th scope="col" className=" text-bg-warning">
                GST No.
              </th>
              <th scope="col" className=" text-bg-warning">
                Location
              </th>
              <th scope="col" className=" text-bg-warning">
                Phone Number
              </th>
              <th scope="col" className=" text-bg-warning">
                Pending Amount
              </th>
              {location.pathname !== "/" && (
                <>
                  <th scope="col" className=" text-bg-warning">
                    Edit
                  </th>
                  <th scope="col" className=" text-bg-warning">
                    Delete
                  </th>
                  <th scope="col" className=" text-bg-warning">
                    GO
                  </th>
                </>
              )}
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
            ) : shops.length > 0 ? (
              shops.map((shop) => {
                return (
                  <ShopTableData key={shop._id} shop={shop} value={value} />
                );
              })
            ) : (
              <tr>
                <td colSpan="5">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ShopTable;
