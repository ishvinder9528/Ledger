import React, { useEffect, useState, useContext, createRef } from "react";
import BillContext from "../../contexts/bill/billContext";
import { useNavigate } from "react-router-dom";
import BillItemModal from "../billItem/BillItemModal";
const AllBills = () => {
  const context = useContext(BillContext);
  const {
    shopId,
    getAll,
    loaded,
    setLoaded,
    setShopId,
    setBillId,
    setBill_Id,
  } = context;
  const [bills, setBills] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const showBillItemModal = createRef(null);
  const closeBillItemModal = createRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loaded) {
      getAll(shopId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

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

  const handleSort = () => {
    const sortedBills = [...filteredBills].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setBills(sortedBills);
  };

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

        <div className="container my-5">
          <div className="row align-items-center">
            <div className="col-md-4">
              <label htmlfor="search" className="form-label">
                Shop Name
              </label>
              <div className="input-group">
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
                <button className="btn btn-warning" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <label htmlfor="fromDate" className="form-label">
                From Date
              </label>
              <input
                type="date"
                className="form-control"
                id="fromDate"
                name="fromDate"
                onChange={(e) => {
                  setFromDate(e.target.value);
                }}
              />
            </div>
            <div className="col-md-4">
              <label htmlfor="toDate" className="form-label">
                To Date
              </label>
              <input
                type="date"
                className="form-control"
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
                Date{"  "}
                <span style={{ cursor: "pointer" }} onClick={handleSort}>
                  <i className="fa-solid fa-sort"></i>
                </span>
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
                          onClick={() => {
                            showBillItemModal.current.click();
                            setBillId(bill.billid);
                            setBill_Id(bill._id);
                          }}
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
      <BillItemModal
        showBillItemModal={showBillItemModal}
        closeBillItemModal={closeBillItemModal}
      />
    </div>
  );
};

export default AllBills;
