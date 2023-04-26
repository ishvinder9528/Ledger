import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../../contexts/shop/shopContext";
import ShopTableData from "./ShopTableData";
import { useLocation } from "react-router-dom";
import Spinner from "../Spinner";

const ShopTable = (props) => {
  const { value } = props;
  const context = useContext(ShopContext);
  const { getShops, shops, loaded } = context;
  const location = useLocation();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!loaded) {
      getShops();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded,shops]);

  const filteredShops =
    loaded && shops
      ? shops.filter((shop) => {
          // console.log(shop);
          return (
            shop.name &&
            shop.name.toLowerCase().includes(searchText.toLowerCase())
          );
        })
      : shops;

  return (
    <div className="mx-1 table-responsive ">
      <section>
        {!value && (
          <>
            <div className="container d-flex search-container my-2">
              <span>
                <i
                  className="fa-solid fa-magnifying-glass border border-warning p-1 mt-1 mx-1"
                  style={{ color: "orange" }}
                ></i>
              </span>
              <span>
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  name="search"
                  placeholder="Search by Shop Name"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
              </span>
            </div>
          </>
        )}

        <table className="table table-center ">
          <thead>
            <tr>
              <th scope="col" className="text-bg-warning">
                Name
              </th>
              <th scope="col" className="text-bg-warning">
                GST No.
              </th>
              <th scope="col" className="text-bg-warning">
                Location
              </th>
              <th scope="col" className="text-bg-warning">
                Phone Number
              </th>
              <th scope="col" className="text-bg-warning">
                Pending Amount
              </th>
              {location.pathname !== "/" && (
                <>
                  <th scope="col" className="text-bg-warning">
                    Edit
                  </th>
                  <th scope="col" className="text-bg-warning">
                    Delete
                  </th>
                  <th scope="col" className="text-bg-warning">
                    GO
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="text-center">
            {!loaded ? (
              <tr>
                <td
                  colSpan={location.pathname === "/" ? "5" : "8"}
                  className="text-center"
                >
                  <Spinner />
                </td>
              </tr>
            ) : value ? (
              filteredShops.length > 0 ? (
                filteredShops.slice(0, value).map((shop) => {
                  return <ShopTableData key={shop._id} shop={shop} />;
                })
              ) : (
                <tr>
                  <td colSpan="5">No data found</td>
                </tr>
              )
            ) : filteredShops.length > 0 ? (
              filteredShops.map((shop) => {
                return <ShopTableData key={shop._id} shop={shop} />;
              })
            ) : (
              <tr>
                <td colSpan="8">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ShopTable;
