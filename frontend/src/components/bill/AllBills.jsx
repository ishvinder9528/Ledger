import React, { useEffect, useState, useContext } from "react";
import BillContext from "../../contexts/bill/billContext";
import { useNavigate } from "react-router-dom";
const AllBills = () => {
  const context = useContext(BillContext);
  const { shopId, getAll, billsData, loaded, setLoaded, setShopId } = context;
  const [bills, setBills] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    
    if (!loaded) {
      getAll(shopId);
    
    } else {
      setBills(billsData);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, getAll, shopId, billsData]);

  const filteredBills =
    loaded && bills
      ? bills.filter((bill) => {
    
          return (
            bill.shopname &&
            bill.shopname.toLowerCase().includes(searchText.toLowerCase())
          );
        })
      : bills;

  return (
    <div>
      {" "}
      <div className=" table-responsive mx-5">
        <div className="row my-5">
          <div className="col-md-3">
            <button
              className="btn btn-outline-warning mx-2"
              onClick={() => {
                navigate("/shop");
                setLoaded(false);
                setShopId("");
              }}
              style={{ cursor: "context-menu" }}
            >
              <i
                className="fa-solid fa-chevron-left fa-lg p-3"
                style={{ cursor: "context-menu" }}
              ></i>
            </button>
          </div>
          <div className="col-md-6">
            <h2 className="text-center text-warning mb-5 ">All Bills</h2>
          </div>
          <div className="col-md-3"></div>
        </div>
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
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className=" text-bg-warning">
                Bill ID
              </th>
              <th scope="col" className="text-bg-warning">
                Shop Name
              </th>
              <th scope="col" className=" text-bg-warning">
                Bill No
              </th>
              <th scope="col" className=" text-bg-warning">
                Date
              </th>
              <th scope="col" className=" text-bg-warning">
                CGST
              </th>
              <th scope="col" className=" text-bg-warning">
                SGST
              </th>
              <th scope="col" className=" text-bg-warning">
                IGST
              </th>
              <th scope="col" className=" text-bg-warning">
                GR Amount
              </th>
              <th scope="col" className=" text-bg-warning">
                Amount
              </th>
              <th scope="col" className=" text-bg-warning">
                Total Amount
              </th>
              <th scope="col" className=" text-bg-warning">
                Pending Amount
              </th>
              <th scope="col" className="px-3 text-bg-warning ">
                Status
              </th>
              <th scope="col" className=" text-bg-warning">
                Show
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBills && filteredBills.length > 0 ? (
              filteredBills.map((bill) => {
                return (
                  <>
                    <tr key={bill._id}>
                      <th scope="row">{bill.billid}</th>
                      <th>{bill.shopname}</th>
                      <td>{bill.billno}</td>
                      <td>{new Date(bill.date).toLocaleDateString("en-GB")}</td>
                      <td>{bill.cgst}</td>
                      <td>{bill.sgst}</td>
                      <td>{bill.igst}</td>
                      <td>{bill.gramount}</td>
                      <td>{bill.amount}</td>
                      <td>{bill.totalamount}</td>
                      <td>{bill.balanceleft}</td>

                      <td
                        className={` text-bg-${
                          bill.status === "Paid" ? "success" : "danger"
                        } `}
                      >
                        {bill.status}
                      </td>
                      <td>
                        {" "}
                        <i
                          className="fa-solid fa-hand-pointer fa-lg px-2"
                          style={{ color: "#0aea06" }}
                        ></i>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <>
                <tr>
                  <td colSpan="12"> No Data Found</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBills;
