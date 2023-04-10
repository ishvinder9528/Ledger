import mongoose from "mongoose";
const { Schema } = mongoose;


const billSchema = new Schema(
  {
    billno: {
      type: Number,
      required: true,
    },
    items: [
      {
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
        cgst: {
          type: Number,
        },
        igst: {
          type: Number,
        },
        gst: {
          type: Number,
        },
        gramount:{
            type: Number,
        },
        totalamount:{
          type: Number,
          default: 0,
        },
        
      },
    ],
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'shops'
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("bills", billSchema);
module.exports = Bill;
