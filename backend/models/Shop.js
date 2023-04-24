const mongoose = require("mongoose");
const { Schema } = mongoose;


const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gstno: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
  },
  pendingAmount: {
    type: Number,
    default: 0,
  },
  phone:{
    type:Number,
    default: null,
  }
});



const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
