import React, { useContext, useEffect, useState } from "react";
import BillContext from "../../contexts/bill/billContext";
import ReactDatePicker from "react-datepicker";


const EditBillForm = () => {
  const context = useContext(BillContext);
  const {
    shopId,
    shopName,
    getBill,
    editBillData,
    setEditBillData,
    getBillData,
    isEdit,
    setEditBillLoaded,
    editBillLoaded,
  } = context;
  const [editBill, setEditBill] = useState({
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
  });

  useEffect(() => {
    console.log(shopName);
    getBillData(shopId, isEdit.id);
    console.log("data - ", editBillData);
    if (editBillData.length !== 0) {
      setEditBill(editBillData);
      setEditBillLoaded(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit.id, editBillLoaded]);

  const onChange = (e) => {
    const { name, value } = e.target;
    let totalAmount = 0;

    if (name === "cgst") {
      totalAmount =
        parseFloat(value) +
        parseFloat(editBill.igst) +
        parseFloat(value) +
        parseFloat(editBill.amount) -
        parseFloat(editBill.gramount);
        setEditBill({
        ...editBill,
        sgst: value,
        cgst: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "igst") {
      totalAmount =
        parseFloat(editBill.cgst) +
        parseFloat(value) +
        parseFloat(editBill.sgst) +
        parseFloat(editBill.amount) -
        parseFloat(editBill.gramount);
        setEditBill({
        ...editBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "sgst") {
      totalAmount =
        parseFloat(editBill.cgst) +
        parseFloat(editBill.igst) +
        parseFloat(value) +
        parseFloat(editBill.amount) -
        parseFloat(editBill.gramount);
        setEditBill({
        ...editBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "amount") {
      totalAmount =
        parseFloat(editBill.cgst) +
        parseFloat(editBill.igst) +
        parseFloat(editBill.sgst) +
        parseFloat(value) -
        parseFloat(editBill.gramount);
        setEditBill({
        ...editBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "gramount") {
      totalAmount =
        parseFloat(editBill.cgst) +
        parseFloat(editBill.igst) +
        parseFloat(editBill.sgst) +
        parseFloat(editBill.amount) -
        parseFloat(value);
        setEditBill({
        ...editBill,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else {
      setEditBill({
        ...editBill,
        [name]: value,
      });
    }
  };
  const handleDateChange = (date) => {
    setEditBill({
      ...editBill,
      date: date,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shopName);
    console.log(shopId);
    console.log(editBill);
    setEditBill({
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
    });
    getBill(shopId);
    getBill(shopId);
    setEditBillData({})
    
  };

  return (
    <div className="mx-3 border border-success mb-3">
      <div className="p-4">
        <h2 className=" text-center text-success mb-4">Edit Bill</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <div className="row">
              <div className="col-6">
                <label htmlfor="billid" className="form-label">
                  Edit Bill ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="billid"
                  name="billid"
                  value={editBill.billid}
                  aria-describedby="billid"
                  placeholder="A-id"
                  onChange={onChange}
                />
              </div>
              <div className="col-6">
                <div className="mb-3 ">
                  <label htmlfor="billno" className="form-label">
                    Edit Bill No
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="billno"
                    name="billno"
                    value={editBill.billno}
                    aria-describedby="billno"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="mb-3 ">
                <label htmlfor="cgst" className="form-label">
                  Edit CGST
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="cgst"
                  name="cgst"
                  value={editBill.cgst}
                  aria-describedby="cgst"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="col-4">
              <div className="mb-3 ">
                <fieldset disabled>
                  <label htmlfor="sgst" className="form-label">
                    Edit SGST
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="sgst"
                    name="sgst"
                    value={editBill.sgst}
                    aria-describedby="sgst"
                    onChange={onChange}
                  />
                </fieldset>
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3 ">
                <label htmlfor="igst" className="form-label">
                  Edit IGST
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="igst"
                  name="igst"
                  value={editBill.igst}
                  aria-describedby="igst"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="mb-3 ">
                <label htmlfor="gramount" className="form-label">
                  Edit GR Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="gramount"
                  name="gramount"
                  value={editBill.gramount}
                  aria-describedby="gramount"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 ">
                <label htmlfor="balanceleft" className="form-label">
                  Edit Pending Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="balanceleft"
                  name="balanceleft"
                  value={editBill.balanceleft}
                  aria-describedby="balanceleft"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label htmlfor="date" className="form-label">
                  Edit Date
                </label>
                <ReactDatePicker
                  type="date"
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  value={new Date(editBill.date).toLocaleDateString()}
                  name="date"
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 ">
                <label htmlfor="status" className="form-label">
                  Edit Status
                </label>
                <select
                  className="form-select"
                  value={editBill.status}
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
                <label htmlfor="amount" className="form-label">
                  Edit Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={editBill.amount}
                  aria-describedby="amount"
                  onChange={onChange}
                />
              </div>
            </div>
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
                    value={editBill.totalamount}
                    aria-describedby="totalamount"
                    onChange={onChange}
                  />
                </fieldset>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            Modify Bill
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default EditBillForm;
