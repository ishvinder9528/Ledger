import React from "react";

const BillItemTable = () => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
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
        </tbody>
        <tr className="my-2">
          <th colSpan={6} className=" text-end fs-4">
            {" "}
            Total Amount ={" "}
          </th>
        </tr>
      </table>
    </div>
  );
};

export default BillItemTable;
