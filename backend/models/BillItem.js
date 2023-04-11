const mongoose = require('mongoose')
const { Schema } = mongoose;

const billItemSchema = new Schema({
    billid:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Bill"
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
})


const BillItem = mongoose.model("BillItem", billItemSchema);
module.exports = BillItem;