const mongoose = require('mongoose')
const { Schema } = mongoose;


const billSchema = new Schema(
  {
    billno: {
      type: String,
      required: true,
    },
    billid:{
      unique: true,
      type:String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Shop'
    },
    status:{
      type:"string",
      default:"Paid"
    }
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
