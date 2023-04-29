import React, { useContext, useEffect } from "react";
import BillContext from "../../contexts/bill/billContext";
import ReactDatePicker from "react-datepicker";
import { parse } from "date-fns";

const EditBillForm = () => {
  const context = useContext(BillContext);
  const {
    shopId,
    shopName,
    editBillData,
    setEditBillData,
    getBillData,
    isEdit,
    editBill,
    setIsEdit,
    setLoaded,
  } = context;

  useEffect(() => {
    console.log(shopName);
    setEditBillData({
      shopname: shopName,
      billid: "",
      billno: "",
      cgst: "",
      sgst: "",
      igst: "",
      gramount: "",
      balanceleft: "",
      amount: "",
      totalamount: "",
      status: "",
      aftergramount: "",
      roundoffamount: "",
      grgst: "",
      date: new Date(),
    });
    getBillData(shopId, isEdit.id);
    console.log("data - ", editBillData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit.id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    let totalAmount = 0;
    let totalAfterGrAmount = 0;

    if (name === "cgst") {
      totalAfterGrAmount =
        parseFloat(editBillData.amount) -
        parseFloat(editBillData.gramount) -
        (parseFloat(editBillData.gramount) * parseFloat(editBillData.grgst)) /
          100;
      totalAmount =
        totalAfterGrAmount +
        (parseFloat(editBillData.amount) * parseFloat(value)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(value)) / 100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.igst)) / 100;
      setEditBillData({
        ...editBillData,
        sgst: value,
        cgst: value,
        totalamount: totalAmount.toFixed(2),
        aftergramount: totalAfterGrAmount,
        roundoffamount: Math.round(totalAmount),
      });
    } else if (name === "igst") {
      totalAfterGrAmount =
        parseFloat(editBillData.amount) - parseFloat(editBillData.gramount) -
        (parseFloat(editBillData.gramount) * parseFloat(editBillData.grgst)) /
          100;
      totalAmount =
        totalAfterGrAmount +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.cgst)) /
          100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.sgst)) /
          100 +
        (parseFloat(editBillData.amount) * parseFloat(value)) / 100;
      setEditBillData({
        ...editBillData,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
        aftergramount: totalAfterGrAmount,
        roundoffamount: Math.round(totalAmount),
      });
    }else if (name === "grgst") {
      totalAfterGrAmount =
        parseFloat(editBillData.amount) - parseFloat(editBillData.gramount) -
        (parseFloat(editBillData.gramount) * parseFloat(value)) /
          100;
      totalAmount =
        totalAfterGrAmount +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.cgst)) /
          100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.sgst)) /
          100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.igst)) / 100;
      setEditBillData({
        ...editBillData,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
        aftergramount: totalAfterGrAmount,
        roundoffamount: Math.round(totalAmount),
      });
    } else if (name === "amount") {
      totalAfterGrAmount =
        parseFloat(value) - parseFloat(editBillData.gramount) -
        (parseFloat(editBillData.gramount) * parseFloat(editBillData.grgst)) /
          100;
      totalAmount =
        totalAfterGrAmount +
        (parseFloat(value) * parseFloat(editBillData.cgst)) / 100 +
        (parseFloat(value) * parseFloat(editBillData.sgst)) / 100 +
        (parseFloat(value) * parseFloat(editBillData.igst)) / 100;
      setEditBillData({
        ...editBillData,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
        aftergramount: totalAfterGrAmount,
        roundoffamount: Math.round(totalAmount),
      });
    } else if (name === "gramount") {
      totalAfterGrAmount = parseFloat(editBillData.amount) - parseFloat(value)-
      (parseFloat(editBillData.gramount) * parseFloat(editBillData.grgst)) /
        100;
      totalAmount =
        totalAfterGrAmount +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.cgst)) /
          100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.sgst)) /
          100 +
        (parseFloat(editBillData.amount) * parseFloat(editBillData.igst)) / 100;
      setEditBillData({
        ...editBillData,
        [name]: value,
        totalamount: totalAmount.toFixed(2),
        aftergramount: totalAfterGrAmount,
        roundoffamount: Math.round(totalAmount),
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
    editBill(shopId, isEdit.id, editBillData);
    setLoaded(false);
    setEditBillData({
      shopname: shopName,
      billid: "",
      billno: "",
      cgst: "",
      sgst: "",
      igst: "",
      gramount: "",
      balanceleft: "",
      amount: "",
      totalamount: "",
      status: "",
      aftergramount: "",
      roundoffamount: "",
      date: new Date(),
      grgst: "",
    });
    setIsEdit({
      value: false,
      id: "",
    });
  };

  return (
    <div className="mx-3 border border-success mb-3">
      <div className="p-4">
        <h2 className=" text-center text-success mb-4">
          Edit Bill {`${editBillData.billid}`}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className=" ">
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
                  placeholder="Fetching... Please wait..."
                  onChange={onChange}
                />
              </div>
              <div className="col-6">
                <div className="mb-3 ">
                  <label htmlfor="billno" className="form-label">
                    Edit Bill No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="billno"
                    name="billno"
                    value={editBillData.billno}
                    aria-describedby="billno"
                    onChange={onChange}
                    placeholder="Fetching... Please wait..."
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
                  value={editBillData.amount}
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
                <label htmlfor="cgst" className="form-label">
                  Edit CGST %
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="cgst"
                  name="cgst"
                  value={editBillData.cgst}
                  aria-describedby="cgst"
                  onChange={onChange}
                  placeholder="Fetching... Please wait..."
                />
              </div>
            </div>

            <div className="col-4">
              <div className="mb-3 ">
                <fieldset disabled>
                  <label htmlfor="sgst" className="form-label">
                    Edit SGST %
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="sgst"
                    name="sgst"
                    value={editBillData.sgst}
                    aria-describedby="sgst"
                    onChange={onChange}
                    placeholder="Fetching... Please wait..."
                  />
                </fieldset>
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3 ">
                <label htmlfor="igst" className="form-label">
                  Edit IGST %
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="igst"
                  name="igst"
                  value={editBillData.igst}
                  aria-describedby="igst"
                  placeholder="Fetching... Please wait..."
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
                  placeholder="Fetching... Please wait..."
                />
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3 ">
                <label htmlfor="grgst" className="form-label">
                  Edit GR GST%
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="grgst"
                  name="grgst"
                  value={editBillData.grgst}
                  aria-describedby="grgst"
                  onChange={onChange}
                  placeholder="Fetching... Please wait..."
                />
              </div>
            </div>
            <div className="col-1"></div>
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
                  value={new Date(editBillData.date).toLocaleDateString(
                    "en-US",
                    { day: "2-digit", month: "2-digit", year: "numeric" }
                  )}
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
                  placeholder="Fetching... Please wait..."
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
                  placeholder="Fetching... Please wait..."
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 ">
                <label htmlfor="aftergramount" className="form-label">
                  Edit After GR Amount
                </label>
                <input
                  type="number"
                  disabled={true}
                  className="form-control"
                  id="aftergramount"
                  placeholder="Fetching... Please wait..."
                  name="aftergramount"
                  value={editBillData.aftergramount}
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
                    value={editBillData.totalamount}
                    placeholder="Fetching... Please wait..."
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
                    value={editBillData.roundoffamount}
                    placeholder="Fetching... Please wait..."
                    aria-describedby="roundoffamount"
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
