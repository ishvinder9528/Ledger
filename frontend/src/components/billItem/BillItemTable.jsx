import React, { useContext } from "react";
import BillContext from "../../contexts/bill/billContext";

const BillItemTable = () => {
  const context = useContext(BillContext);
  const { billItems } = context;

  return (
    <div className="table-responsive">
      <table className="table ">
        <thead>
          <tr>
            <th scope="col" className=" text-bg-warning">
              Sno.
            </th>
            <th scope="col" className=" text-bg-warning">
              Qty
            </th>
            <th scope="col" className=" text-bg-warning">
              Price
            </th>
            <th scope="col" className=" text-bg-warning">
              Amount
            </th>
            <th scope="col" className=" text-bg-warning">
              Discount in %
            </th>
            <th scope="col" className=" text-bg-warning">
              Net Amount
            </th>
            <th scope="col" className=" text-bg-warning">
              Item Desc.
            </th>
            <th scope="col" className=" text-bg-warning">
              Edit
            </th>
            <th scope="col" className=" text-bg-warning">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {billItems && billItems.length !== 0 ? (
            billItems.map((billItem) => {
              return (
                <tr key={billItem._id}>
                  <td>{billItem.sno}</td>
                  <td>{billItem.qty}</td>
                  <td>{billItem.price}</td>
                  <td>{billItem.amount}</td>
                  <td>{billItem.discount}</td>
                  <td>{billItem.netamount}</td>
                  <td>{billItem.itemdesc}</td>
                  <td>
                    <i
                      className="fa-solid fa-pen-to-square fa-lg"
                      style={{ color: "orange" }}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-trash-can fa-lg"
                      style={{ color: "red" }}
                    ></i>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>No Data Found</td>
            </tr>
          )}
        </tbody>
        <tr className="my-2">
          <th colSpan={6} className="  fs-4">
            {" "}
            Total Amount ={" "}
          </th>
        </tr>
      </table>
    </div>
  );
};

export default BillItemTable;
