const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop");
const Bill = require("../models/Bill");
const billItem = require("../models/BillItem");
const BillItem = require("../models/BillItem");

//Request 1 : Add Shop data by POST => http://localhost:5000/shops/create
router.post("/create", async (req, res) => {
  // console.log("Enter in this");
  try {
    // console.log(req.body);
    const { name, gstno, location, pendingAmount, phone } = await req.body;
    const shop = new Shop({
      name: name,
      gstno: gstno,
      location: location,
      phone: phone,
      pendingAmount: pendingAmount,
    });
    // console.log(shop);
    const saveShop = await shop.save();
    res.json({ added: saveShop });
    // console.log("Added Successfully");
  } catch (err) {
    // console.log("error => " + err);
    res.status(400).json({ error: err.message });
  }
});

// Request 2 : Get All Shop data by GET => http://localhost:5000/shops/allshops
router.get("/allshops", async (req, res) => {
  // console.log("Enter in this");
  try {
    const shopData = await Shop.find();
    res.json({ shopData });
    // console.log("your shops data =>", shopData);
  } catch (err) {
    // console.log("error => " + err);
    res.status(400).json({ error: err.message });
  }
});

// Request 3 : Get particular Shop data by GET => http://localhost:5000/shops/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findById(id);
    if (!shop) {
      // console.log("Not Found");
      res.status(404).send("Not Found");
    } else {
      res.json({ shop });
      // console.log("your shops data =>", shop);
    }
  } catch (err) {
    // console.log("error => " + err);
    res.status(400).json({ error: err.message });
  }
});

// Request 4: Update a Particular Shop Data by PATCH => http://localhost:5000/shops/:id
router.patch("/:id", async (req, res) => {
  // console.log("Enter in this");
  try {
    const { id } = req.params;

    const shop = await Shop.findById(id);
    if (!shop) {
      // console.log("Not Found");
      return res.status(404).send("Not Found");
    }
    const shopData = await Shop.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ shopData });
    // console.log("Data Updated SuccessFully");
  } catch (err) {
    // console.log("error => " + err);
    res.status(400).json({ error: err.message });
  }
});

// Request 5: Delete Shop By DELETE : http:localhost:5000/shops/delete/:id
router.delete("/delete/:id", async (req, res) => {
  // console.log("Enter in this");
  try {
    const { id } = req.params;
    const shop = await Shop.findById(id);
    // console.log(id);
    // console.log(shop);
    if (!shop) {
      // console.log("Not Found");
      return res.status(404).send("Not Found");
    }
    const bills = await Bill.deleteMany({ shop: shop._id });
    // console.log("Bills Deleted");
    const billItems = await BillItem.deleteMany({ billid: bills._id });
    // console.log("BillsItems Deleted");

    await Shop.findByIdAndDelete(id);
    // console.log("Deleted Successfully");
    res.status(200).send("Deleted Successfully");
  } catch (err) {
    // console.log("error => " + err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
