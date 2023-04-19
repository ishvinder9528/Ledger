import React from "react";

const AddBillItemForm = (props) => {
  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-2">
            <div className="mb-3">
              <label for="qty" className="form-label">
                Qty
              </label>
              <input type="number" className="form-control" id="qty" name="qty" />
            </div>
          </div>
          x
          <div className="col-md-3">
            <div className="mb-3">
              <label for="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
              />
            </div>
          </div>
          =
          <div className="col-md-3">
            <div className="mb-3">
              <label for="amount" className="form-label">
                amount
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                disabled="true"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label for="itemdesc" className="form-label">
                Item Desc.
              </label>
              <input
                type="text"
                className="form-control"
                id="itemdesc"
                name="itemdesc"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success float-end mx-2">
          Add
        </button>
        <button
          type="submit"
          onClick={() => {
            props.setIsAdd(false);
          }}
          className="btn btn-secondary float-end mr-4 "
        >
          Cancle
        </button>
      </form>
    </div>
  );
};

export default AddBillItemForm;
