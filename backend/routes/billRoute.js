const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");
const Shop = require("../models/Shop");
const BillItem = require("../models/BillItem");

// Request 1: Add Data to Bill of Particular Shop POST => http://localhost:5000/bills/add/:shopid/
router.post("/add/:shopid", async (req, res) => {
  try {
    const bill = new Bill({
      shopname: req.body.shopname,
      billno: req.body.billno,
      billid: req.body.billid,
      shop: req.params.shopid,
      cgst: req.body.cgst,
      igst: req.body.igst,
      sgst: req.body.sgst,
      amount: req.body.amount,
      gramount: req.body.gramount,
      totalamount: req.body.totalamount,
      balanceleft: req.body.balanceleft,
      status: req.body.status,
      date: req.body.date,
    });

    // check Shop, it exists or not
    const shop = await Shop.findById(req.params.shopid);
    if (!shop) {
      console.log("Shop not found");
      return res.status(404).json({ error: "Shop not found" });
    }

    const addBill = await bill.save();
    res.status(200).json({ message: "Add Successfully", addBill });
    console.log("Add Bill Successfully", addBill);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Request 2: Add Data to BillItem of Bill to Particular Shop POST => http://localhost:5000/bills/:shopid/add/:billid, In Array Form
router.post("/:shopid/add/:billid", async (req, res) => {
  try {
    // check Shop, it exists or not
    const shop = await Shop.findById(req.params.shopid);
    if (!shop) {
      console.log("Shop not found");
      return res.status(404).json({ error: "Shop not found" });
    }

    // check Bill, it exists or not
    const bill = await Bill.findOne({ _id: req.params.billid });
    // console.log(bill);
    if (bill == null || bill.length === 0) {
      console.log("Bills Not Found");
      return res.json({ error: "Bills Not Found" });
    }

    const billItem = new BillItem({
      sno: req.body.sno,
      qty: req.body.qty,
      itemdesc: req.body.itemdesc,
      price: req.body.price,
      amount: req.body.amount,
      discount: req.body.discount,
      netamount: req.body.netamount,
      gst: req.body.gst,

      billid: req.params.billid,
    });

    const savedBillItem = await billItem.save();

    if (savedBillItem) {
      console.log("Add BillItem Successfully", savedBillItem);
      res.status(200).json({ message: "Add Successfully", savedBillItem });
    } else {
      throw new Error("Unable to add BillItem");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Request 3: Get all the bills of particular shop GET => http://localhost:5000/bills/allbills/:shopid
router.get("/allbill/:shopid", async (req, res) => {
  try {
    // check Shop, it exists or not
    const shop = await Shop.findById(req.params.shopid);
    if (!shop) {
      console.log("Shop not found");
      return res.status(404).json({ error: "Shop not found" });
    }

    // Get all Bill from the particlar shop
    const bills = await Bill.find({ shop: req.params.shopid });
    if (bills.length === 0) {
      console.log("Bills Not Found");
      return res.json({ error: "Bills Not Found" });
    }

    res.json({ bills });
    console.log("Bills => ", bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//  Request 4: Get all the billItems of particular Bill of particular shop GET => http://localhost:5000/bills/:shopid/billitems/:billid
router.get("/:shopid/billitems/:billid", async (req, res) => {
  try {
    // check Shop, it exists or not
    const shop = await Shop.findById(req.params.shopid);
    if (!shop) {
      console.log("Shop not found");
      return res.status(404).json({ error: "Shop not found" });
    }

    // check Bill, it exists or not
    const bill = await Bill.findOne({ _id: req.params.billid });
    // console.log(bill);
    if (bill.length === 0) {
      console.log("Bills Not Found");
      return res.json({ error: "Bills Not Found" });
    }

    const billItems = await BillItem.find({ billid: req.params.billid });

    if (billItems.length === 0) {
      console.log("BillItems Not Found");
      return res.json({ error: "BillItems Not Found" });
    }
    res.json({ billItems });
    // console.log("BillItems => ", billItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//  Request 4: Get all the billItems of particular Bill of particular shop GET => http://localhost:5000/bills/:shopid/billitems/:billid
router.get("/billitems/:billid", async (req, res) => {
  try {
    // check Bill, it exists or not
    const bill = await Bill.findOne({ _id: req.params.billid });
    // console.log(bill);
    if (bill.length === 0) {
      console.log("Bills Not Found");
      return res.json({ error: "Bills Not Found" });
    }

    const billItems = await BillItem.find({ billid: req.params.billid });

    if (billItems.length === 0) {
      console.log("BillItems Not Found");
      return res.json({ error: "BillItems Not Found" });
    }
    res.json({ billItems });
    // console.log("BillItems => ", billItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Request 5: Delete the Particular Bill include BillItem From the Shop Delete => http://localhost:5000/bills/:shopid/delete/:bill_id
router.delete("/:shopid/delete/:bill_id", async (req, res) => {
  try {
    // check Shop, it exists or not
    const shop = await Shop.findById(req.params.shopid);
    if (!shop) {
      console.log("Shop not found");
      return res.status(404).json({ error: "Shop not found" });
    }

    // check Bill, it exists or not
    const bill = await Bill.findOne({ shop: req.params.shopid });
    // console.log(bill);
    if (bill.length === 0) {
      console.log("Bills Not Found");
      return res.json({ error: "Bills Not Found" });
    }

    const deletedBill = await Bill.findByIdAndDelete(req.params.bill_id);
    console.log("Deleted Bill", deletedBill);

    const deletedBillItems = await BillItem.deleteMany({
      billid: deletedBill._id,
    });
    console.log("Deleted Bill Items", deletedBillItems);

    res
      .status(200)
      .json({ message: "Bill and Bill Items deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Request 6: Delete All the BillItems of Bill From the particular Shop DELETE=> http://localhost:5000/bills/:shopid/:billid/deleteallbillItems
router.delete("/:shopid/:billid/deleteallbillItems", async (req, res) => {
  try {
    // check Shop, it exists or not
    const shop = await Shop.findById(req.params.shopid);
    if (!shop) {
      console.log("Shop not found");
      return res.status(404).json({ error: "Shop not found" });
    }

    // check Bill, it exists or not
    const bill = await Bill.findOne({ _id: req.params.billid });
    // console.log(bill);
    if (bill.length === 0) {
      console.log("Bills Not Found");
      return res.json({ error: "Bills Not Found" });
    }

    const deletedBillItems = await BillItem.deleteMany({ billid: bill._id });

    res.status(200).json({ success: true, deletedBillItems });
    console.log("BillItems deleted successfully", deletedBillItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Request 7: Delete particular BillItem From particular Bill of Particular Shop DELETE = http://localhost:5000/bills/:shopid/:billid/delete/:billitemid
router.delete("/:shopid/:billid/delete/:billitemid", async (req, res) => {
  try {
    // check Shop, it exists or not
    const shop = await Shop.findById(req.params.shopid);
    if (!shop) {
      console.log("Shop not found");
      return res.status(404).json({ error: "Shop not found" });
    }

    // check Bill, it exists or not
    const bill = await Bill.findOne({ _id: req.params.billid });
    // console.log(bill);
    if (bill.length === 0) {
      console.log("Bills Not Found");
      return res.json({ error: "Bills Not Found" });
    }

    // check BillItem , it exists or not
    const billItem = await BillItem({ _id: req.params.billitemid });
    if (billItem === null || billItem === 0) {
      console.log("BillItem not found");
      return res.status(404).json({ error: "BillItem not found" });
    }

    const deleteBillItem = await BillItem.findByIdAndDelete(
      req.params.billitemid
    );
    if (!deleteBillItem) {
      return res.status(404).send({ message: "BillItem not found" });
    }
    console.log("Successfully deleted BillItem " + deleteBillItem);
    res
      .status(200)
      .json({ message: "Successfully deleted BillItem ", deleteBillItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Request 8: Edit Bill of Particular Shop PATCH => http://localhost:5000/bills/:shopid/edit/:billid
router.patch("/:shopid/edit/:billid", async (req, res) => {
  try {
    // check Shop, it exists or not
    const shop = await Shop.findById(req.params.shopid);
    if (!shop) {
      console.log("Shop not found");
      return res.status(404).json({ error: "Shop not found" });
    }

    // check Bill, it exists or not
    const bill = await Bill.findOne({ _id: req.params.billid });
    // console.log(bill);
    if (bill.length === 0) {
      console.log("Bills Not Found");
      return res.json({ error: "Bills Not Found" });
    }

    const {
      billno,
      billid,
      status,
      sgst,
      cgst,
      igst,
      gramount,
      date,
      amount,
      totalamount,
      balanceleft,
    } = req.body;
    const newBill = {};
    if (billno) newBill.billno = billno;
    if (billid) newBill.billid = billid;
    if (status) newBill.status = status;
    if (sgst) newBill.sgst = sgst;
    if (cgst) newBill.cgst = cgst;
    if (igst) newBill.igst = igst;
    if (gramount) newBill.gramount = gramount;
    if (date) newBill.date = date;
    if (amount) newBill.amount = amount;
    if (totalamount) newBill.totalamount = totalamount;
    if (balanceleft) newBill.balanceleft = balanceleft;

    const newData = await Bill.findByIdAndUpdate(
      req.params.billid,
      { $set: newBill },
      { new: true }
    );
    res.status(200).json({ success: true, newData });
    console.log("Bill Updated Successfully", newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Request 9: Edit Particular BillItem of Bill of particular Shop PATCH => http://localhost:5000/bills/:shopid/:billid/edit/:billitemid
router.patch("/:shopid/:billid/edit/:billitemid", async (req, res) => {
  try {
    // check Shop, it exists or not
    const shop = await Shop.findById(req.params.shopid);
    if (!shop) {
      console.log("Shop not found");
      return res.status(404).json({ error: "Shop not found" });
    }

    // check Bill, it exists or not
    const bill = await Bill.findOne({ _id: req.params.billid });
    //  console.log(bill);
    if (bill.length === 0) {
      console.log("Bills Not Found");
      return res.json({ error: "Bills Not Found" });
    }

    // check BillItem , it exists or not
    const billItem = await BillItem({ _id: req.params.billitemid });
    if (billItem === null || billItem === 0) {
      console.log("BillItem not found");
      return res.status(404).json({ error: "BillItem not found" });
    }

    const newBillItem = {};
    const { qty, itemdesc, price, amount } = req.body;
    if (qty) newBillItem.qty = qty;
    if (itemdesc) newBillItem.itemdesc = itemdesc;
    if (price) newBillItem.price = price;
    if (amount) newBillItem.amount = amount;

    const newData = await BillItem.findByIdAndUpdate(
      billItem._id,
      { $set: newBillItem },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "BillItem Edit Successfully", newData });
    console.log(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Request 10: Get all the bills GET => http://localhost:5000/bills/allbills
router.get("/allbills", async (req, res) => {
  try {
    // const bills = await Bill.aggregate([
    //   {
    //     $addFields: {
    //       prefix: { $substr: ["$billid", 0, 2] }, // Get prefix from billid
    //       numeric_number: { $toInt: { $substr: ["$billid", 2, -1] } }, // Convert number to numeric type
    //     },
    //   },
    //   { $sort: { prefix: -1, numeric_number: -1 } }, // Sort by prefix in descending order and number in ascending order
    // ])
    const bills = await Bill.find();
    console.log(bills);
    if (bills.length === 0) {
      console.log("No Bill Found");
      return res.status(400).json({ error: "No Bill Found" });
    }
    return res.json({ bills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Request 11: Get data of particular bill of particular shop -  http://localhost:5000/bills/:shopid/bill/:billid
router.get("/:shopid/bill/:billid", async (req, res) => {
  try {
    // check Shop, it exists or not
    const shop = await Shop.findById(req.params.shopid);
    if (!shop) {
      console.log("Shop not found");
      return res.status(404).json({ error: "Shop not found" });
    }

    // check Bill, it exists or not
    const bill = await Bill.findOne({ _id: req.params.billid });
    //  console.log(bill);
    if (bill.length === 0) {
      console.log("Bills Not Found");
      return res.json({ error: "Bills Not Found" });
    }

    res.status(200).json({ bill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
