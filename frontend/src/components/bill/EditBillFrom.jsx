import React, { useContext, useEffect } from "react";
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
    editBill,
    setIsEdit,
  } = context;

  useEffect(() => {
    console.log(shopName);
    setEditBillData({
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
    getBillData(shopId, isEdit.id);
    console.log("data - ", editBillData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit.id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    let totalAmount = 0;

    if (name === "cgst") {
      totalAmount =
      parseFloat(editBillData.amount) +
        (parseFloat(editBillData.amount) * 2 * parseFloat(value)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.isgt)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(value)) / 100 -
        parseFloat(editBillData.gramount);
      setEditBillData({
        ...editBillData,
        sgst: value,
        cgst: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "igst") {
      totalAmount =
               parseFloat(editBillData.amount) +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.cgst)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(value)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.sgst)) / 100 -
        parseFloat(editBillData.gramount);
      setEditBillData({
        ...editBillData,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "sgst") {
      totalAmount =
        parseFloat(editBillData.amount) +
        (parseFloat(editBillData.amount) * parseFloat(value)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.igst)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(value)) / 100 -
        parseFloat(editBillData.gramount);
      setEditBillData({
        ...editBillData,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "amount") {
      totalAmount =
        parseFloat(value) +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.cgst)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.igst)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.sgst)) / 100 -
        parseFloat(editBillData.gramount);
      setEditBillData({
        ...editBillData,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else if (name === "gramount") {
      totalAmount =
       parseFloat(editBillData.amount) +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.cgst)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.igst)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.sgst)) / 100 -
        parseFloat(value);
      setEditBillData({
        ...editBillData,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
      });
    } else {
      setEditBillData({
        ...editBillData,
        [name]: value,
      });
    }
  };
  const handleDateChange = (date) => {
    setEditBillData({
      ...editBillData,
      date: date,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shopName);
    console.log(shopId);
    console.log(editBillData);
    editBill(shopId, isEdit.id, editBillData);
    setEditBillData({
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
    getBill(shopId);
    getBill(shopId);
    setEditBillData({
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
    setIsEdit({
      value:false,
      id:''
    });
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
                  value={editBillData.billid}
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
                    value={editBillData.billno}
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
                  value={editBillData.cgst}
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
                    value={editBillData.sgst}
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
                  value={editBillData.igst}
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
                  value={editBillData.gramount}
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
                  value={editBillData.balanceleft}
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
                  className="form-control"
                  value={new Date(editBillData.date).toLocaleDateString()}
                  dateFormat="dd/MM/yyyy"
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
                  value={editBillData.status}
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
                  value={editBillData.amount}
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
                    value={editBillData.totalamount}
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
