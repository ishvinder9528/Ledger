import React, { useEffect, useContext, createRef } from "react";
import BillContext from "../../contexts/bill/billContext";
import BillItemModal from "../billItem/BillItemModal";
import DeleteBillModal from "./DeleteBillModal";
import Spinner from "../Spinner";
const BillsTable = () => {
  const openDeleteBillModal = createRef(null);
  const closeDeleteBillModal = createRef(null);
  const context = useContext(BillContext);
  const {
    shopId,
    getBill,
    billsData,
    loaded,
    setIsEdit,
    setBillId,
    setBill_Id,
    bill_Id,
    billId,
    setItemLoad,
   
  } = context;

  const showBillItemModal = createRef(null);
  const closeBillItemModal = createRef(null);

  useEffect(() => {
    setItemLoad(false);
    if (!loaded) {
      getBill(shopId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);
  return (
    <div className="mx-1 table-responsive">
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
              CGST in %
            </th>
            <th scope="col" className=" text-bg-warning">
              SGST in %
            </th>
            <th scope="col" className=" text-bg-warning">
              IGST in %
            </th>
            <th scope="col" className=" text-bg-warning">
              GR Amount
            </th>
            <th scope="col" className=" text-bg-warning">
              GR GST%
            </th>
            <th scope="col" className=" text-bg-warning">
              Amount
            </th>
            <th scope="col" className=" text-bg-warning">
              Amount After GR
            </th>
            <th scope="col" className=" text-bg-warning">
              Total Amount 
            </th>
            <th scope="col" className=" text-bg-warning">
              Round OFF Amount
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
            <th scope="col" className="px-3 text-bg-warning ">
              Status
            </th>
            <th scope="col" className=" text-bg-warning">
              Show
            </th>
          </tr>
        </thead>
        <tbody>
          {!loaded ? (
            <tr>
              <td colSpan={15} className="text-center">
                <Spinner />
              </td>
            </tr>
          ) : billsData && billsData.length > 0 ? (
            billsData.map((bill) => {
              return (
                <tr key={bill._id}>
                  <th scope="row">{bill.billid}</th>
                  <th>{bill.shopname}</th>
                  <td>{bill.billno}</td>
                  <td>{new Date(bill.date).toLocaleDateString("en-GB")}</td>
                  <td>{bill.cgst}</td>
                  <td>{bill.sgst}</td>
                  <td>{bill.igst}</td>
                  <td>{bill.gramount}</td>
                  <td>{bill.grgst}</td>
                  <td>{bill.amount}</td>
                  <td>{bill.aftergramount}</td>
                  <td>{bill.totalamount}</td>
                  <td className="text-dark">{bill.roundoffamount}</td>
                  <td>{bill.balanceleft}</td>
                  <td>
                    {" "}
                    <i
                      className="fa-solid fa-user-pen fa-lg px-2"
                      style={{ color: "#ffbd61" }}
                      onClick={() =>
                        setIsEdit({
                          value: true,
                          id: bill._id,
                        })
                      }
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-trash-can fa-lg px-3"
                      style={{ color: "red" }}
                      onClick={() => {
                        openDeleteBillModal.current.click();
                        setBill_Id(bill._id);
                      }}
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
                      onClick={() => {
                        setBillId(bill.billid);
                        setBill_Id(bill._id);
                        console.log(bill_Id, billId);
                        setItemLoad(false);

                        showBillItemModal.current.click();
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="14">No bills found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <DeleteBillModal
        openDeleteBillModal={openDeleteBillModal}
        closeDeleteBillModal={closeDeleteBillModal}
      />

      <BillItemModal
        showBillItemModal={showBillItemModal}
        closeBillItemModal={closeBillItemModal}
      />
    </div>
  );
};

export default BillsTable;
