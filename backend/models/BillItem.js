const mongoose = require("mongoose");
const { Schema } = mongoose;

const billItemSchema = new Schema({
  billid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bill",
  },
  sno: {
    type: Number,
    unique: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  itemdesc: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
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
  gst:{
    type: Number
  }
});

const BillItem = mongoose.model("BillItem", billItemSchema);
module.exports = BillItem;
