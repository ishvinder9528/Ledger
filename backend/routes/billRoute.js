const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");
const Shop = require("../models/Shop");
const BillItem = require("../models/BillItem");

// Request 1: Add Data to Bill of Particular Shop POST => http://localhost:5000/bills/add/:shopid/
router.post("/add/:shopid", async (req, res) => {
  try {
    const bill = new Bill({
      billno: req.body.billno,
      billid: req.body.billid,
      shop: req.params.shopid,
    });
    const addBill = await bill.save();
    res.status(200).json({ message: "Add Successfully", addBill });
    console.log("Add Bill Successfully", addBill);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Request 2:Add Data to BillItem of Bill to Particular Shop POST => http://localhost:5000/bills/:shopid/add/:billid
router.post("/:shopid/add/:billid", async (req, res) => {
  try {
    const billItems = req.body;
    const addedBillItems = [];

    for (const billItem of billItems) {
      const newBillItem = new BillItem({
        qty: billItem.qty,
        itemdesc: billItem.itemdesc,
        price: billItem.price,
        amount: billItem.amount,
        cgst: billItem.cgst,
        igst: billItem.igst,
        gst: billItem.gst,
        gramount: billItem.gramount,
        totalamount: billItem.totalamount,
        billid: req.params.billid,
      });

      const savedBillItem = await newBillItem.save();
      addedBillItems.push(savedBillItem);
    }
    if (addedBillItems) {
      console.log("Add BillItem Successfully", addedBillItems);
      res.status(200).json({ message: "Add Successfully", addedBillItems });
    } else {
      throw new Error("Unable to add BillItem");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Request 3: Get all the bills of particular shop GET => http://localhost:5000/bills/allbills/:shopid
router.get("/allbills/:shopid", async (req, res) => {
  try {
    const bills = await Bill.find({ shop: req.params.shopid });
    if (!bills) {
      console.log("Bills Not Found");
      res.json({ error: "Bills Not Found" });
    }
    res.json({ bills });
    console.log("Bills => ", bills);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

//  Request 4: Get all the billItems of particular Bill of particular shop GET => http://localhost:5000/bills/:shopid/:billid/billitems
router.get("/:shopid/:billid/billitems", async (req, res) => {
  try {
    const billItems = await BillItem.find({ billid: req.params.billid });

    if (billItems.length === 0) {
      console.log("BillItems Not Found");
      return res.json({ error: "BillItems Not Found" });
    }
    res.json({ billItems });
    console.log("BillItems => ", billItems);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
