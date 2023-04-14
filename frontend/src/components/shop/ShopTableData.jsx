import React from "react";

const ShopTableData = (props) => {
  const { shop } = props;
  return (
    <>
 
        <tr key={shop._id}>
          <th scope="row">{shop.name}</th>
          <td>{shop.gstno}</td>
          <td>{shop.location}</td>
          <td>{shop.phone}</td>
          <td>{shop.pendingAmount}</td>
        </tr>
 
    </>
  );
};

export default ShopTableData;
