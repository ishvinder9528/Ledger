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
    status: {
      type: "string",
      default: "Paid",
    },
    cgst: {
      type: Number,
    },
    igst: {
      type: Number,
    },
    gst: {
      type: Number,
    },
    gramount: {
      type: Number,
    },
    totalamount: {
      type: Number,
      default: 0,
    },
    balanceleft: {
      type: Number,
      default:0,
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
