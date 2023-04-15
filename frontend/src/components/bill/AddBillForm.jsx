import React, { useContext, useEffect, useState } from "react";
import BillContext from "../../contexts/bill/billContext";

const AddBillForm = (props) => {
  const context = useContext(BillContext);
  const { shopId, addBill, shopName,getBill } = context;
  const [newBill, setNewBill] = useState({
    shopname: shopName,
    billid: "A-",
    billno: "",
    cgst: 0,
    sgst: 0,
    igst: 0,
    gramount: 0,
    balanceleft: 0,
    amount: 0,
    totalamount: 0,
    status: "Paid",
  });

  useEffect(() => {
    console.log(shopName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    let totalAmount = 0;

    if (name === "cgst") {
      totalAmount =
        parseFloat(value) +
        parseFloat(newBill.igst) +
        parseFloat(value) +
        parseFloat(newBill.amount) -
        parseFloat(newBill.gramount);
      setNewBill({
        ...newBill,
        sgst: value,
        cgst: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "igst") {
      totalAmount =
        parseFloat(newBill.cgst) +
        parseFloat(value) +
        parseFloat(newBill.sgst) +
        parseFloat(newBill.amount) -
        parseFloat(newBill.gramount);
      setNewBill({
        ...newBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "sgst") {
      totalAmount =
        parseFloat(newBill.cgst) +
        parseFloat(newBill.igst) +
        parseFloat(value) +
        parseFloat(newBill.amount) -
        parseFloat(newBill.gramount);
      setNewBill({
        ...newBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "amount") {
      totalAmount =
        parseFloat(newBill.cgst) +
        parseFloat(newBill.igst) +
        parseFloat(newBill.sgst) +
        parseFloat(value) -
        parseFloat(newBill.gramount);
      setNewBill({
        ...newBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "gramount") {
      totalAmount =
        parseFloat(newBill.cgst) +
        parseFloat(newBill.igst) +
        parseFloat(newBill.sgst) +
        parseFloat(newBill.amount) -
        parseFloat(value);
      setNewBill({
        ...newBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else {
      setNewBill({
        ...newBill,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shopName);
    console.log(shopId);
    console.log(newBill);
    addBill(shopId, newBill);
    setNewBill({
      shopname: shopName,
      billid: "A-",
      billno: "",
      cgst: 0,
      sgst: 0,
      igst: 0,
      gramount: 0,
      balanceleft: 0,
      amount: 0,
      totalamount: 0,
      status: "Paid",
    });
    getBill(shopId)
    getBill(shopId)
    getBill(shopId)
    getBill(shopId)
  };

  return (
    <div className="mx-3 border border-warning mb-3">
      <div className="p-4">
        <h2 className=" text-center text-warning mb-4">Add Bill</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-3 ">
            <div className="row">
              <div className="col-6">
                <label for="billid" class="form-label">
                  Bill ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="billid"
                  name="billid"
                  value={newBill.billid}
                  aria-describedby="billid"
                  placeholder="A-id"
                  onChange={onChange}
                />
              </div>
              <div className="col-6">
                <div class="mb-3 ">
                  <label for="billno" class="form-label">
                    Bill No
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="billno"
                    name="billno"
                    value={newBill.billno}
                    aria-describedby="billno"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div class="mb-3 ">
                <label for="cgst" class="form-label">
                  CGST
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="cgst"
                  name="cgst"
                  value={newBill.cgst}
                  aria-describedby="cgst"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="col-4">
              <div class="mb-3 ">
                <fieldset disabled>
                  <label for="sgst" class="form-label">
                    SGST
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="sgst"
                    name="sgst"
                    value={newBill.sgst}
                    aria-describedby="sgst"
                    onChange={onChange}
                  />
                </fieldset>
              </div>
            </div>
            <div className="col-4">
              <div class="mb-3 ">
                <label for="igst" class="form-label">
                  IGST
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="igst"
                  name="igst"
                  value={newBill.igst}
                  aria-describedby="igst"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div class="mb-3 ">
                <label for="gramount" class="form-label">
                  GR Amount
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="gramount"
                  name="gramount"
                  value={newBill.gramount}
                  aria-describedby="gramount"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div class="mb-3 ">
                <label for="balanceleft" class="form-label">
                  Pending Amount
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="balanceleft"
                  name="balanceleft"
                  value={newBill.balanceleft}
                  aria-describedby="balanceleft"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div class="mb-3 ">
                <label for="amount" class="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="amount"
                  name="amount"
                  value={newBill.amount}
                  aria-describedby="amount"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div class="mb-3 ">
                <label for="status" class="form-label">
                  Status
                </label>
                <select
                  class="form-select"
                  value={newBill.status}
                  name="status"
                  onChange={onChange}
                >
                  <option value="Paid">Paid</option>
                  <option value="Not Paid">Not Paid</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div class="mb-3 ">
                <fieldset disabled>
                  <label for="totalamount" class="form-label">
                    Total Amount
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="totalamount"
                    name="totalamount"
                    value={newBill.totalamount}
                    aria-describedby="totalamount"
                    onChange={onChange}
                  />
                </fieldset>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-warning">
            Add Bill
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBillForm;
