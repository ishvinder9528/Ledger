import React, { useContext, useState } from "react";
import ShopContext from "../../contexts/shop/shopContext";

const AddShop = () => {
  const [shop, setShop] = useState({
    name: "",
    gstno: "",
    location: "",
    phone: NaN,
    pendingAmount: NaN,
  });
  const context = useContext(ShopContext)
  const{addShop, getShops} =context
  const handleSubmit = (e) => {
    e.preventDefault();
    addShop(shop)
    setShop({
        name: "",
        gstno: "",
        location: "",
        phone: NaN,
        pendingAmount: NaN,
    })
    getShops()
  };
  const onChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };
  return (
    <div className="mx-4 border border-warning  p-4">
      <h3 className="text-center text-warning">Add Shop</h3>
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
            className="form-control"
            id="gstno"
            aria-describedby="gstno"
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
              id="location"
              aria-describedby="location"
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
              placeholder=" 9999999999"
              aria-describedby="phone"
              onChange={onChange}
            />
          </div>
        </span>
        <div className="mb-3" style={{ maxWidth: "20rem" }}>
          <label htmfor="pendingAmount" className="form-label">
            Pending Amount
          </label>
          <input
            type="number"
            name="pendingAmount"
            className="form-control"
            id="pendingAmount"
            aria-describedby="pendingAmount"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddShop;
