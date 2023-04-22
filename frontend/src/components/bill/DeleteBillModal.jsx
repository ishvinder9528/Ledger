import React, { useContext } from "react";

import BillContext from "../../contexts/bill/billContext";

const DeleteBillModal = (props) => {
  const billContext = useContext(BillContext);
  const { shopId, bill_Id, setBill_Id, deleteBill } = billContext;
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        class="btn btn-primary d-none"
        ref={props.openDeleteBillModal}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content ">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Delete Bill?
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body  ">
              <p>Are you really Want to delete this Bill</p>
              <div style={{ fontSize: "14px" }}>
                This will delete this Bill along with BillItems
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={props.closeDeleteBillModal}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => {
                  deleteBill(shopId, bill_Id);
                  setBill_Id("");
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
