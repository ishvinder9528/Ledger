import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import ShopContext from "../../contexts/shop/shopContext";
const ShopTableData = (props) => {
  const { shop } = props;
  const location = useLocation();
  const context = useContext(ShopContext);
  const { deleteShop, setIsEdit, isEdit } = context;
  return (
    <>
      <tr key={shop._id}>
        <th scope="row">{shop.name}</th>
        <td>{shop.gstno}</td>
        <td>{shop.location}</td>
        <td>{shop.phone}</td>
        <td>{shop.pendingAmount}</td>
        {location.pathname !== "/" && (
          <>
            <td>
              <i
                className="fa-solid fa-user-pen fa-lg px-2"
                style={{ color: "#ffbd61" }}
                onClick={() => {
                  setIsEdit({
                    value: true,
                    id: shop._id,
                  });
                  // console.log(isEdit.id);
                }}
              ></i>
            </td>
            <td>
              <i
                className="fa-solid fa-trash-can fa-lg px-3"
                style={{ color: "red" }}
                onClick={() => deleteShop(shop._id)}
              ></i>
            </td>
            <td>
              <i
                className="fa-solid fa-hand-pointer fa-lg px-2"
                style={{ color: "#0aea06" }}
              ></i>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export default ShopTableData;
