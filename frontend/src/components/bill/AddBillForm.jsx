import React, { useContext, useEffect, useState } from "react";
import BillContext from "../../contexts/bill/billContext";
import ReactDatePicker from "react-datepicker";

const AddBillForm = () => {
  const context = useContext(BillContext);
  const { shopId, addBill, shopName, setLoaded } = context;
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
    date: new Date(),
    aftergramount: 0,
    roundoffamount: 0,
    grgst: 0,
  });

  useEffect(() => {
    console.log(shopName);
    console.log(shopId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    let totalAmount = 0;
    let totalAfterGrAmount = 0;

    if (name === "cgst") {
      totalAfterGrAmount =
        parseFloat(newBill.amount) -
        parseFloat(newBill.gramount) -
        (parseFloat(newBill.gramount) * parseFloat(newBill.grgst)) / 100;
      totalAmount =
        totalAfterGrAmount +
        (parseFloat(newBill.amount) * parseFloat(value)) / 100 +
        (parseFloat(newBill.amount) * parseFloat(value)) / 100 +
        (parseFloat(newBill.amount) * parseFloat(newBill.igst)) / 100;
      setNewBill({
        ...newBill,
        sgst: value,
        cgst: value,
        totalamount: totalAmount.toFixed(2),
        aftergramount: totalAfterGrAmount,
        roundoffamount: Math.round(totalAmount),
      });
    } else if (name === "igst") {
      totalAfterGrAmount =
        parseFloat(newBill.amount) -
        parseFloat(newBill.gramount) -
        (parseFloat(newBill.gramount) * parseFloat(newBill.grgst)) / 100;
      totalAmount =
        totalAfterGrAmount +
        (parseFloat(newBill.amount) * parseFloat(newBill.cgst)) / 100 +
        (parseFloat(newBill.amount) * parseFloat(newBill.sgst)) / 100 +
        (parseFloat(newBill.amount) * parseFloat(value)) / 100;
      setNewBill({
        ...newBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
        aftergramount: totalAfterGrAmount,
        roundoffamount: Math.round(totalAmount),
      });
    } else if (name === "grgst") {
      totalAfterGrAmount =
        parseFloat(newBill.amount) -
        parseFloat(newBill.gramount) -
        (parseFloat(newBill.gramount) * parseFloat(value)) / 100;
      totalAmount =
        totalAfterGrAmount +
        (parseFloat(newBill.amount) * parseFloat(newBill.cgst)) / 100 +
        (parseFloat(newBill.amount) * parseFloat(newBill.sgst)) / 100 +
        (parseFloat(newBill.amount) * parseFloat(newBill.igst)) / 100;
      setNewBill({
        ...newBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
        aftergramount: totalAfterGrAmount,
        roundoffamount: Math.round(totalAmount),
      });
    } else if (name === "amount") {
      totalAfterGrAmount =
        parseFloat(value) -
        parseFloat(newBill.gramount) -
        (parseFloat(newBill.gramount) * parseFloat(newBill.grgst)) / 100;
      totalAmount =
        totalAfterGrAmount +
        (parseFloat(value) * parseFloat(newBill.cgst)) / 100 +
        (parseFloat(value) * parseFloat(newBill.sgst)) / 100 +
        (parseFloat(value) * parseFloat(newBill.igst)) / 100;
      setNewBill({
        ...newBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
        aftergramount: totalAfterGrAmount,
        roundoffamount: Math.round(totalAmount),
      });
    } else if (name === "gramount") {
      totalAfterGrAmount =
        parseFloat(newBill.amount) -
        parseFloat(value) -
        (parseFloat(newBill.gramount) * parseFloat(newBill.grgst)) / 100;
      totalAmount =
        totalAfterGrAmount +
        (parseFloat(newBill.amount) * parseFloat(newBill.cgst)) / 100 +
        (parseFloat(newBill.amount) * parseFloat(newBill.sgst)) / 100 +
        (parseFloat(newBill.amount) * parseFloat(newBill.igst)) / 100;
      setNewBill({
        ...newBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
        aftergramount: totalAfterGrAmount,
        roundoffamount: Math.round(totalAmount),
      });
    } else {
      setNewBill({
        ...newBill,
        [name]: value,
      });
    }
  };
  const handleDateChange = (date) => {
    setNewBill({
      ...newBill,
      date: date,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newBill);
    console.log("shop id", shopId);
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
      date: new Date(),
      aftergramount: 0,
      roundoffamount: 0,
      grgst: 0,
    });
    setLoaded(false);
  };

  return (
    <div className="mx-3 border border-warning mb-3">
      <div className="p-4">
        <h2 className=" text-center text-warning mb-4">Add Bill</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <div className="row">
              <div className="col-6">
                <label htmlFor="billid" className="form-label">
                  Bill ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="billid"
                  name="billid"
                  value={newBill.billid}
                  aria-describedby="billid"
                  placeholder="A-id"
                  onChange={onChange}
                />
              </div>
              <div className="col-6">
                <div className="mb-3 ">
                  <label htmlFor="billno" className="form-label">
                    Bill No
                  </label>
                  <input
                    type="text"
                    className="form-control"
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
            <div className="col-3"></div>
            <div className="col-6">
              <div className="mb-3 ">
                <label htmlfor="amount" className="form-label">
                  Edit Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  placeholder="Fetching... Please wait..."
                  name="amount"
                  value={newBill.amount}
                  aria-describedby="amount"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-3"></div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="mb-3 ">
                <label htmlFor="cgst" className="form-label">
                  CGST%
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="cgst"
                  name="cgst"
                  value={newBill.cgst}
                  aria-describedby="cgst"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3 ">
                <fieldset disabled>
                  <label htmlFor="sgst" className="form-label">
                    SGST%
                  </label>
                  <input
                    type="number"
                    className="form-control"
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
              <div className="mb-3 ">
                <label htmlFor="igst" className="form-label">
                  IGST%
                </label>
                <input
                  type="number"
                  className="form-control"
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
            <div className="col-1"></div>
            <div className="col-6">
              <div className="mb-3 ">
                <label htmlfor="gramount" className="form-label">
                  GR Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="gramount"
                  name="gramount"
                  value={newBill.gramount}
                  aria-describedby="gramount"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3 ">
                <label htmlfor="grgst" className="form-label">
                  GR GST%
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="grgst"
                  name="grgst"
                  value={newBill.grgst}
                  aria-describedby="grgst"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-1"></div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <ReactDatePicker
                  type="date"
                  className="form-control"
                  selected={newBill.date}
                  dateFormat="dd/MM/yyyy"
                  name="date"
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 ">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
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
              <div className="mb-3 ">
                <label htmlfor="balanceleft" className="form-label">
                  Pending Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="balanceleft"
                  name="balanceleft"
                  value={newBill.balanceleft}
                  aria-describedby="balanceleft"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 ">
                <label htmlfor="aftergramount" className="form-label">
                  After GR Amount
                </label>
                <input
                  type="number"
                  disabled={true}
                  className="form-control"
                  id="aftergramount"
                  name="aftergramount"
                  value={newBill.aftergramount}
                  aria-describedby="aftergramount"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="mb-3 ">
                <fieldset disabled>
                  <label htmlfor="totalamount" className="form-label">
                    Total Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalamount"
                    name="totalamount"
                    value={newBill.totalamount}
                    aria-describedby="totalamount"
                    onChange={onChange}
                  />
                </fieldset>
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 ">
                <fieldset disabled>
                  <label htmlfor="roundoffamount" className="form-label">
                    Round Off Amount
                  </label>
                  <input
                    type="number"
                    className="form-control text-success"
                    id="roundoffamount"
                    name="roundoffamount"
                    value={newBill.roundoffamount}
                    aria-describedby="roundoffamount"
                    onChange={onChange}
                  />
                </fieldset>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-warning">
            Add Bill
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBillForm;
