import React, { useContext, useEffect, useState } from "react";
import BillContext from "../../contexts/bill/billContext";
import AddBillItemForm from "./AddBillItemForm";
import BillItemTable from "./BillItemTable";
import { useLocation } from "react-router-dom";

const BillItemModal = (props) => {
  const [isAdd, setIsAdd] = useState(false);
  const context = useContext(BillContext);
  const location = useLocation();
  const {
    shopName,
    billId,
    itemLoad,
    billItems,
    setItemLoad,
    shopId,
    bill_Id,
    getBillItems,
    setBillItems,
  } = context;

  useEffect(() => {
    console.log(location.pathname);
    console.log(itemLoad);
    if (!itemLoad) {
      getBillItems(shopId, bill_Id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemLoad, billItems]);

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={props.showBillItemModal}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {shopName} {billId} BillItems
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setItemLoad(false);
                  setBillItems([]);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <BillItemTable />
              {location.pathname === "/all" ? (
                ""
              ) : (
                <div
                  className="btn btn-warning"
                  onClick={() => {
                    setIsAdd(true);
                  }}
                >
                  +
                </div>
              )}
              {isAdd && <AddBillItemForm setIsAdd={setIsAdd} />}
            </div>
            <div className="modal-footer mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                ref={props.closeBillItemModal}
                data-bs-dismiss="modal"
                onClick={() => {
                  setItemLoad(false);
                  setBillItems([]);
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                ref={props.closeBillItemModal}
                onClick={() => {
                  setItemLoad(false);
                  setBillItems([]);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillItemModal;
