const mongoose = require("mongoose");

const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors())

const port = process.env.PORT;
const db = process.env.DATABASE;

const shopRoute = require("./routes/shopRoute");
const billRoute = require("./routes/billRoute");

mongoose
  .connect(db)
  .then(() => {
    console.log("Connection to Database Successfully");
    app.listen(port || 8000, (error) => {
      if (!error) {
        console.log("listening on port http://localhost:" + port);
        // app.use("/",(req, res) => {
        //     res.json({message:"whyy??"})
        // })
        app.use("/shops", shopRoute);
        app.use("/bills", billRoute);
      } else {
        console.error("error =>", error);
      }
    });
  })
  .catch((err) => {
    console.log("error connecting to Database =>", err.message);
  });
