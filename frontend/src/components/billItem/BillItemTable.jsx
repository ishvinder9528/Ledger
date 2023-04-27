import React, { useContext } from "react";
import BillContext from "../../contexts/bill/billContext";

const BillItemTable = () => {
  const context = useContext(BillContext);
  const { billItems, deleteBillItem, shopId, bill_Id } = context;

// Sort billItems by sno in ascending order and create a new array to preserve the original
var sortedBillItems = [];
if (billItems && billItems.length !== 0) {
  sortedBillItems = billItems.slice().sort((a, b) => a.sno - b.sno);
}
// Calculate total amount by summing netamount of all bill items
var totalAmount = 0;
if (sortedBillItems && sortedBillItems.length !== 0) {
  totalAmount = sortedBillItems.reduce((acc, curr) => {
    // Add a check for the netamount property
    return acc + (curr.netamount ? curr.netamount : 0);
  }, 0);
}


  return (
    <div className="table-responsive">
      <table className="table ">
        <thead>
          <tr>
            <th scope="col" className=" text-bg-warning">
              Sno.
            </th>
            <th scope="col" className=" text-bg-warning">
              Item Desc.
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
              GST in %
            </th>
            <th scope="col" className=" text-bg-warning">
              Net Amount
            </th>
            <th scope="col" className=" text-bg-warning">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedBillItems && sortedBillItems.length !== 0 ? (
            sortedBillItems.map((billItem) => {
              return (
                <tr key={billItem._id}>
                  <td>{billItem.sno}</td>
                  <td>{billItem.itemdesc}</td>
                  <td>{billItem.qty}</td>
                  <td>{billItem.price}</td>
                  <td>{billItem.amount}</td>
                  <td>{billItem.discount}</td>
                  <td>{billItem.gst}</td>
                  <td>{billItem.netamount}</td>

                  <td>
                    <i
                      className="fa-solid fa-trash-can fa-lg"
                      style={{ color: "red" }}
                      onClick={() => {
                        deleteBillItem(shopId, bill_Id, billItem._id);
                      }}
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
            Total Amount ={totalAmount}
          </th>
        </tr>
      </table>
    </div>
  );
};

export default BillItemTable;
