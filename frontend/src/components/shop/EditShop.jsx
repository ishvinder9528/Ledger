import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../../contexts/shop/shopContext";

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
  
  const emptyShop = {
    name: "",
    gstno: "",
    location: "",
    phone: "",
    pendingAmount: "",
  };

  useEffect(() => {
    // console.log(isEdit);
    if (isEdit.value) {
      getShopData(isEdit.id);
      if (editShopData.length !== 0) {
        setEditShop({
          name: editShopData.name,
          gstno: editShopData.gstno,
          location: editShopData.location,
          phone: editShopData.phone,
          pendingAmount: editShopData.pendingAmount,
        });
      }
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
    // Reset the input fields to their previous values
    setEditShop((prevShop) => ({ ...prevShop, ...emptyShop }));
    getShops();
  };
  const onChange = (e) => {
    setEditShop({ ...editShop, [e.target.name]: e.target.value });
  };
  return (
    <div className="mx-4 border border-success  p-4">
      <h3 className="text-center text-success">Edit Shop</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmfor="name" className="form-label">
            Edit Shop Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            aria-describedby="name"
            value={editShop.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmfor="gstno" className="form-label">
            Edit GST Number
          </label>
          <input
            type="text"
            name="gstno"
            className="form-control"
            id="gstno"
            aria-describedby="gstno"
            value={editShop.gstno}
            onChange={onChange}
          />
        </div>
        <span>
          <div className="mb-3" style={{ maxWidth: "20rem" }}>
            <label htmfor="location" className="form-label">
              Edit Location
            </label>
            <input
              type="text"
              name="location"
              className="form-control"
              id="location"
              aria-describedby="location"
              value={editShop.location}
              onChange={onChange}
            />
          </div>
        </span>
        <span>
          <div className="form-outline mb-3" style={{ maxWidth: "20rem" }}>
            <label htmfor="phone" className="form-label">
              Edit Phone Number
            </label>
            <input
              type="number"
              name="phone"
              className="form-control"
              id="phone"
              placeholder=" 9999999999"
              aria-describedby="phone"
              value={editShop.phone}
              onChange={onChange}
            />
          </div>
        </span>
        <div className="mb-3" style={{ maxWidth: "20rem" }}>
          <label htmfor="pendingAmount" className="form-label">
            Edit Pending Amount
          </label>
          <input
            type="number"
            name="pendingAmount"
            className="form-control"
            id="pendingAmount"
            aria-describedby="pendingAmount"
            value={editShop.pendingAmount}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Modify
        </button>
        <i
          className="fa-solid fa-trash-can fa-xl mx-5"
          style={{ color: "red" }}
          onClick={() => {
            deleteShop(editShopData._id);
            setIsEdit({
              value: false,
              id: null,
            });
             setEditShop((prevShop) => ({ ...prevShop, ...emptyShop }));
          }}
        ></i>
        <i
          className="fa-solid fa-user-plus fa-xl mx-3"
          style={{ color: "orange" }}
          onClick={() => {
            setIsEdit({
              value: false,
              id: null,
            });
            setEditShop((prevShop) => ({ ...prevShop, ...emptyShop }));
          }}
        ></i>
      </form>
    </div>
  );
};

export default EditShop;
