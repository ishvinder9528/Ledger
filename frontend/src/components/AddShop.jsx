import React, { useContext, useState } from "react";
import ShopContext from "../contexts/shop/shopContext";

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
        <div class="mb-3">
          <label for="name" class="form-label">
            Shop Name
          </label>
          <input
            type="text"
            name="name"
            class="form-control"
            id="name"
            aria-describedby="name"
            onChange={onChange}
          />
        </div>
        <div class="mb-3">
          <label for="gstno" class="form-label">
            GST Number
          </label>
          <input
            type="text"
            name="gstno"
            class="form-control"
            id="gstno"
            aria-describedby="gstno"
            onChange={onChange}
          />
        </div>
        <span>
          <div class="mb-3" style={{ maxWidth: "20rem" }}>
            <label for="location" class="form-label">
              Location
            </label>
            <input
              type="text"
              name="location"
              class="form-control"
              id="location"
              aria-describedby="location"
              onChange={onChange}
            />
          </div>
        </span>
        <span>
          <div class="form-outline mb-3" style={{ maxWidth: "20rem" }}>
            <label for="phone" class="form-label">
              Phone Number
            </label>
            <input
              type="number"
              name="phone"
              class="form-control"
              id="phone"
              placeholder=" 9999999999"
              aria-describedby="phone"
              onChange={onChange}
            />
          </div>
        </span>
        <div class="mb-3" style={{ maxWidth: "20rem" }}>
          <label for="pendingAmount" class="form-label">
            Pending Amount
          </label>
          <input
            type="number"
            name="pendingAmount"
            class="form-control"
            id="pendingAmount"
            aria-describedby="pendingAmount"
            onChange={onChange}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddShop;
