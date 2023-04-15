import React from "react";

const EditBillForm = () => {
  return (
    <div className="mx-3 border border-warning">
      <div className="p-4">
        <h2 className=" text-center text-warning mb-4">Add Bill</h2>
        <form>
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
                  aria-describedby="billid"
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
                    aria-describedby="billno"
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
                  aria-describedby="cgst"
                />
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
                  aria-describedby="igst"
                />
              </div>
            </div>
            <div className="col-4">
              <div class="mb-3 ">
                <label for="gst" class="form-label">
                  GST
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="gst"
                  name="gst"
                  aria-describedby="gst"
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
                  aria-describedby="gramount"
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
                  aria-describedby="balanceleft"
                />
              </div>
            </div>
          </div>
          <div class="mb-3 ">
            <label for="totalamount" class="form-label">
              Total Amount
            </label>
            <input
              type="number"
              class="form-control"
              id="totalamount"
              name="totalamount"
              aria-describedby="totalamount"
            />
          </div>
          <button type="submit" class="btn btn-warning">
            Add Bill
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBillForm;
