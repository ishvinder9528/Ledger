import React, { useContext, useState } from "react";
import BillContext from "../../contexts/bill/billContext";

const AddBillItemForm = (props) => {
  const context = useContext(BillContext);
  const { shopId, bill_Id, addBillItem, setItemLoad } = context;
  const [billitem, setBillItem] = useState({
    snum: "",
    qty: 0,
    price: 0,
    amount: "",
    discount: 0,
    netamount: "",
    itemdesc: "",
    gst: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    let qty = parseFloat(billitem.qty);
    let price = parseFloat(billitem.price);
    let discount = parseFloat(billitem.discount);
    let gst = parseFloat(billitem.gst);

    qty = isNaN(qty) ? 0 : qty;
    price = isNaN(price) ? 0 : price;
    discount = isNaN(discount) ? 0 : discount;
    gst = isNaN(gst) ? 0 : gst;

    // update the state based on the changed field
    if (name === "qty") {
      qty = parseFloat(value);
    } else if (name === "price") {
      price = parseFloat(value);
    } else if (name === "discount") {
      discount = parseFloat(value);
    } else if (name === "gst") {
      gst = parseFloat(value);
    }

    let amount = (qty * price).toFixed(2);
    let netamount = (
      amount -
      amount * (discount / 100) +
      amount * (gst / 100)
    ).toFixed(2);

    // update the state with the new values
    setBillItem({
      ...billitem,
      [name]: value,
      qty,
      price,
      discount,
      amount,
      netamount,
      gst,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBillItem(shopId, bill_Id, billitem);
    setItemLoad(false);
    setBillItem({
      snum: "",
      qty: 0,
      price: 0,
      amount: "",
      discount: 0,
      netamount: "",
      itemdesc: "",
      gst: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-1">
            <div className="mb-3">
              <label htmlfor="snum" className="form-label">
                Sno.
              </label>
              <input
                type="number"
                className="form-control"
                id="snum"
                name="snum"
                value={billitem.snum}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-md-2">
            <div className="mb-3">
              <label htmlfor="itemdesc" className="form-label">
                Item Desc.
              </label>
              <input
                type="text"
                className="form-control"
                id="itemdesc"
                name="itemdesc"
                value={billitem.itemdesc}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-md-1">
            <div className="mb-3">
              <label htmlfor="qty" className="form-label">
                Qty
              </label>
              <input
                type="number"
                className="form-control"
                id="qty"
                name="qty"
                value={billitem.qty}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-md-2">
            <div className="mb-3">
              <label htmlfor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={billitem.price}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-md-1">
            <div className="mb-3">
              <label htmlfor="discount" className="form-label">
                Discount%
              </label>
              <input
                type="number"
                className="form-control"
                id="discount"
                name="discount"
                value={billitem.discount}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-md-1">
            <div className="mb-3">
              <label htmlfor="gst" className="form-label">
                GST %
              </label>
              <input
                type="number"
                className="form-control"
                id="gst"
                name="gst"
                value={billitem.gst}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-md-2">
            <div className="mb-3">
              <label htmlfor="Amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                disabled={true}
                value={billitem.amount}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-md-2">
            <div className="mb-3">
              <label htmlfor="netamount" className="form-label">
                Net Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="netamount"
                name="netamount"
                disabled={true}
                value={billitem.netamount}
                onChange={onChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success float-end mx-2">
          Add
        </button>
        <i
          type="submit"
          onClick={() => {
            props.setIsAdd(false);
          }}
          className="btn btn-secondary float-end mr-4 "
        >
          Cancel
        </i>
      </form>
    </div>
  );
};

export default AddBillItemForm;
