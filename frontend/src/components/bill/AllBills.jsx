import React, { useEffect, useState, useContext } from "react";
import BillContext from "../../contexts/bill/billContext";
import { useNavigate } from "react-router-dom";
const AllBills = () => {
  const context = useContext(BillContext);
  const { shopId, getAll, billsData, loaded, setLoaded, setShopId } = context;
  const [bills, setBills] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
          const billDate = new Date(bill.date);
          const isAfterFromDate =
            !fromDate || billDate >= new Date(fromDate + "T00:00:00");
          const isBeforeToDate =
            !toDate || billDate <= new Date(toDate + "T23:59:59");
          return (
            bill.shopname &&
            bill.shopname.toLowerCase().includes(searchText.toLowerCase()) &&
            isAfterFromDate &&
            isBeforeToDate
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

        <div class="container my-5">
          <div class="row align-items-center">
            <div class="col-md-4">
              <label for="search" class="form-label">
                Shop Name
              </label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="search"
                  name="search"
                  placeholder="Search by Shop Name"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <button class="btn btn-warning" type="button">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div class="col-md-4">
              <label for="fromDate" class="form-label">
                From Date
              </label>
              <input
                type="date"
                class="form-control"
                id="fromDate"
                name="fromDate"
                onChange={(e) => {
                  setFromDate(e.target.value);
                }}
              />
            </div>
            <div class="col-md-4">
              <label for="toDate" class="form-label">
                To Date
              </label>
              <input
                type="date"
                class="form-control"
                id="toDate"
                name="toDate"
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
              />
            </div>
          </div>
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
