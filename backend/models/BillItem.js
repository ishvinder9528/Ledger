const mongoose = require("mongoose");
const { Schema } = mongoose;

const billItemSchema = new Schema({
  billid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bill",
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
});

const BillItem = mongoose.model("BillItem", billItemSchema);
module.exports = BillItem;
