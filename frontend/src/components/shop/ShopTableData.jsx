import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShopContext from "../../contexts/shop/shopContext";
import BillContext from "../../contexts/bill/billContext";

const ShopTableData = (props) => {
  const { shop } = props;
  const location = useLocation();
  const context = useContext(ShopContext);
  const billContext = useContext(BillContext);
  const { setBillId } = billContext;
  const { deleteShop, setIsEdit, setShopName } = context;
  const navigate = useNavigate();

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
                onClick={() => {
                  navigate("/bill");
                  setBillId(shop._id);
                  setShopName(shop.name)
                }}
              ></i>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export default ShopTableData;
