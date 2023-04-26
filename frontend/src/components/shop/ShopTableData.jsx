import React, { useContext, createRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShopContext from "../../contexts/shop/shopContext";
import BillContext from "../../contexts/bill/billContext";
import DeleteShopModal from "./DeleteShopModal";

const ShopTableData = (props) => {
  const { shop } = props;
  const location = useLocation();
  const context = useContext(ShopContext);
  const billContext = useContext(BillContext);
  const { setShopId, setShopName } = billContext;
  const { setIsEdit } = context;
  const navigate = useNavigate();
  const showDeleteShopModal = createRef(null);
  const closeDeleteShopModal = createRef(null);
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
                onClick={() => {
                  // deleteShop(shop._id);
                  setShopId(shop._id);
                  showDeleteShopModal.current.click();
                }}
              ></i>
            </td>
            <td>
              <i
                className="fa-solid fa-hand-pointer fa-lg px-2"
                style={{ color: "#0aea06" }}
                onClick={() => {
                  navigate("/bill");
                  setShopId(shop._id);
                  setShopName(shop.name);
                }}
              ></i>
            </td>
            <DeleteShopModal
              showDeleteShopModal={showDeleteShopModal}
              closeDeleteShopModal={closeDeleteShopModal}
            />
          </>
        )}
      </tr>
    </>
  );
};

export default ShopTableData;
