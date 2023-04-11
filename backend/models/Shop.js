const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
    default: NaN,
  },
  phone:{
    type:Number,
    default: NaN,
  }
});



const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
