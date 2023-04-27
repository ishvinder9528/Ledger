import React, { useContext } from "react";

import BillContext from "../../contexts/bill/billContext";

const DeleteBillModal = (props) => {
  const billContext = useContext(BillContext);
  const { shopId, bill_Id, setBill_Id, deleteBill,setLoaded } = billContext;
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={props.openDeleteBillModal}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete Bill?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body  ">
              <p>Are you really Want to delete this Bill</p>
              <div style={{ fontSize: "14px" }}>
                This will delete this Bill along with BillItems
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={props.closeDeleteBillModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  deleteBill(shopId, bill_Id);
                  setBill_Id("");
                  setLoaded(false)
                  props.closeDeleteBillModal.current.click();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBillModal;
