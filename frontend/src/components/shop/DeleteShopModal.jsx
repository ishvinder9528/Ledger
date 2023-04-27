import React, { useContext } from "react";
import ShopContext from "../../contexts/shop/shopContext";
import BillContext from "../../contexts/bill/billContext";

const DeleteShopModal = (props) => {
  const context = useContext(ShopContext);
  const { deleteShop, setLoaded } = context;
  const billContext = useContext(BillContext);
  const { shopId, setShopId } = billContext;
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={props.showDeleteShopModal}
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
                Delete Shop?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body  ">
              <p>Are you really Want to delete this Shop</p>
              <div style={{ fontSize: "14px" }}>
                This will delete your all Bills and BillItems
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={props.closeDeleteShopModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  deleteShop(shopId);
                  setShopId("");
                  setLoaded(false);
                  props.closeDeleteShopModal.current.click();
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

export default DeleteShopModal;
