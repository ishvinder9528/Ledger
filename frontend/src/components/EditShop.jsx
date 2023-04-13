import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../contexts/shop/shopContext";

const EditShop = (props) => {
  const context = useContext(ShopContext);
  const {
    getShops,
    editShopData,
    isEdit,
    getShopData,
    deleteShop,
    updateShop,
    setIsEdit,
  } = context;

  const [editShop, setEditShop] = useState({
    name: "",
    gstno: "",
    location: "",
    phone: "",
    pendingAmount: "",
  });

  useEffect(() => {
    // console.log(isEdit);
    if (isEdit.value) {
      getShopData(isEdit.id);
      setEditShop({
        name: editShopData.name,
        gstno: editShopData.gstno,
        location: editShopData.location,
        phone: editShopData.phone,
        pendingAmount: editShopData.pendingAmount,
      });
      getShops();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateShop(editShop, isEdit.id);
    setIsEdit({
      value: false,
      id: null,
    });
    setEditShop({});
    getShops();
  };
  const onChange = (e) => {
    setEditShop({ ...editShop, [e.target.name]: e.target.value });
  };
  return (
    <div className="mx-4 border border-success  p-4">
      <h3 className="text-center text-success">Edit Shop</h3>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Edit Shop Name
          </label>
          <input
            type="text"
            name="name"
            class="form-control"
            id="name"
            aria-describedby="name"
            value={editShop.name}
            onChange={onChange}
          />
        </div>
        <div class="mb-3">
          <label for="gstno" class="form-label">
            Edit GST Number
          </label>
          <input
            type="text"
            name="gstno"
            class="form-control"
            id="gstno"
            aria-describedby="gstno"
            value={editShop.gstno}
            onChange={onChange}
          />
        </div>
        <span>
          <div class="mb-3" style={{ maxWidth: "20rem" }}>
            <label for="location" class="form-label">
              Edit Location
            </label>
            <input
              type="text"
              name="location"
              class="form-control"
              id="location"
              aria-describedby="location"
              value={editShop.location}
              onChange={onChange}
            />
          </div>
        </span>
        <span>
          <div class="form-outline mb-3" style={{ maxWidth: "20rem" }}>
            <label for="phone" class="form-label">
              Edit Phone Number
            </label>
            <input
              type="number"
              name="phone"
              class="form-control"
              id="phone"
              placeholder=" 9999999999"
              aria-describedby="phone"
              value={editShop.phone}
              onChange={onChange}
            />
          </div>
        </span>
        <div class="mb-3" style={{ maxWidth: "20rem" }}>
          <label for="pendingAmount" class="form-label">
            Edit Pending Amount
          </label>
          <input
            type="number"
            name="pendingAmount"
            class="form-control"
            id="pendingAmount"
            aria-describedby="pendingAmount"
            value={editShop.pendingAmount}
            onChange={onChange}
          />
        </div>

        <button type="submit" class="btn btn-success">
          Modify
        </button>
        <i
          class="fa-solid fa-trash-can fa-xl mx-5"
          style={{ color: "red" }}
          onClick={() => {
            deleteShop(editShopData._id);
            setIsEdit({
              value: false,
              id: null,
            });
            setEditShop({});
          }}
        ></i>
      </form>
    </div>
  );
};

export default EditShop;
