import React, { useEffect, useState, useContext } from "react";
import BillContext from "../../contexts/bill/billContext";
import ShopContext from "../../contexts/shop/shopContext";
const BillsTable = () => {
  const context = useContext(BillContext);
  const { billId, getBill, billsData, loaded,deleteBill } = context;
  const [bills, setBills] = useState([]);

  useEffect(() => {
    console.log(loaded);
    if (!loaded) {
      getBill(billId);
      console.log(billsData);
    } else {
      setBills(billsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, getBill, billId, billsData]);
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" className=" text-bg-warning">
              Bill ID
            </th>
            <th scope="col" className=" text-bg-warning">
              Bill No
            </th>
            <th scope="col" className=" text-bg-warning">
              CGST
            </th>
            <th scope="col" className=" text-bg-warning">
              IGST
            </th>
            <th scope="col" className=" text-bg-warning">
              GST
            </th>
            <th scope="col" className=" text-bg-warning">
              GR Amount
            </th>
            <th scope="col" className=" text-bg-warning">
              Total Amount
            </th>
            <th scope="col" className=" text-bg-warning">
              Pending Amount
            </th>
            <th scope="col" className=" text-bg-warning">
              Modify
            </th>
            <th scope="col" className=" text-bg-warning">
              Delete
            </th>
            <th scope="col" className=" text-bg-warning">
              Status
            </th>
            <th scope="col" className=" text-bg-warning">
              Show
            </th>
          </tr>
        </thead>
        <tbody>
          {bills && bills.length > 0 ? (
            bills.map((bill) => {
              return (
                <>
                  <tr key={bill._id}>
                    <th scope="row">{bill.billid}</th>
                    <td>{bill.billno}</td>
                    <td>{bill.cgst}</td>
                    <td>{bill.igst}</td>
                    <td>{bill.gst}</td>
                    <td>{bill.gramount}</td>
                    <td>{bill.totalamount}</td>
                    <td>{bill.balanceleft}</td>
                    <td>
                      {" "}
                      <i
                        className="fa-solid fa-user-pen fa-lg px-2"
                        style={{ color: "#ffbd61" }}

                        // console.log(isEdit.id);
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-trash-can fa-lg px-3"
                        style={{ color: "red" }}
                        onClick={deleteBill(bill._id)}
                      ></i>
                    </td>
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
  );
};

export default BillsTable;
