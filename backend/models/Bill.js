const mongoose = require("mongoose");
const { Schema } = mongoose;

const billSchema = new Schema(
  {
    billno: {
      type: String,
      required: true,
    },
    billid: {
      unique: true,
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    shopname: {
      type: String,
    },
    status: {
      type: String,
      default: "Paid",
    },
    cgst: {
      type: Number,
    },
    igst: {
      type: Number,
    },
    sgst: {
      type: Number,
    },
    gramount: {
      type: Number,
    },
    amount: {
      type: Number,
      required: true,
    },
    totalamount: {
      type: Number,
      default: 0,
    },
    balanceleft: {
      type: Number,
      default: 0,
    },
    date:{
      type:Date,
      required: true,
    }
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
