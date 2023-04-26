import React, { useContext, useEffect } from "react";
import ShopContext from "../../contexts/shop/shopContext";
const EditShop = () => {
  const context = useContext(ShopContext);
  const {
    isEdit,
    setIsEdit,
    getShopData,
    editShopData,
    setEditShopData,
    updateShop,
    deleteShop,
    setLoaded,
  } = context;
  useEffect(() => {
    setEditShopData({
      name: "",
      gstno: "",
      location: "",
      phone: "",
      pendingAmount: "",
    });
    getShopData(isEdit.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit.id]);

  const onChange = (e) => {
    setEditShopData({ ...editShopData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateShop(editShopData);
    setEditShopData({
      name: "",
      gstno: "",
      location: "",
      phone: "",
      pendingAmount: "",
    });
    setIsEdit({
      value: false,
      id: "",
    });
    setLoaded(false);
  };

  return (
    <div className="mx-4 border border-success  p-4">
      <h3 className="text-center text-success">Edit Shop</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmfor="name" className="form-label">
            Shop Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            aria-describedby="name"
            value={editShopData.name}
            placeholder="Please wait Loading...."
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmfor="gstno" className="form-label">
            GST Number
          </label>
          <input
            type="text"
            name="gstno"
            placeholder="Please wait Loading...."
            className="form-control"
            id="gstno"
            aria-describedby="gstno"
            value={editShopData.gstno}
            onChange={onChange}
          />
        </div>
        <span>
          <div className="mb-3" style={{ maxWidth: "20rem" }}>
            <label htmfor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="Please wait Loading...."
              id="location"
              aria-describedby="location"
              value={editShopData.location}
              onChange={onChange}
            />
          </div>
        </span>
        <span>
          <div className="form-outline mb-3" style={{ maxWidth: "20rem" }}>
            <label htmfor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              name="phone"
              className="form-control"
              id="phone"
              placeholder="Please wait Loading...."
              aria-describedby="phone"
              value={editShopData.phone}
              onChange={onChange}
            />
          </div>
        </span>
        <div className="mb-3" style={{ maxWidth: "20rem" }}>
          <fieldset disabled>
            <label htmfor="pendingAmount" className="form-label">
              Pending Amount
            </label>
            <input
              type="number"
              name="pendingAmount"
              className="form-control"
              placeholder="Please wait Loading...."
              id="pendingAmount"
              aria-describedby="pendingAmount"
              value={editShopData.pendingAmount}
              onChange={onChange}
            />
          </fieldset>
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
              id: "",
            });
          }}
        ></i>
        <i
          className="fa-solid fa-user-plus fa-2xl mx-3"
          style={{ color: "orange" }}
          onClick={() => {
            setIsEdit({
              value: false,
              id: "",
            });
          }}
        ></i>
      </form>
    </div>
  );
};

export default EditShop;
