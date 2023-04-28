const mongoose = require("mongoose");
const { Schema } = mongoose;

const billItemSchema = new Schema({
  billid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bill",
  },
  snum: {
    type: Number,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  itemdesc: {
    type: String,
  },
  amount: {
    type: String,
  },
  discount: {
    type: Number,
  },
  netamount: {
    type: Number,
  },
  gst: {
    type: Number,
  },
});

const BillItem = mongoose.model("BillItem", billItemSchema);
module.exports = BillItem;
