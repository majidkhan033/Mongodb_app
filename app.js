import express from "express";

const app = express();

import "./db_connect.js";
import hotelModel from "./models/hotels.js";
import Payment from "./models/Payment.js";

const port = 5000;

app.use(express.json());

app.get("/",(req, res) => {
    res.send("SERVER IS UP")
});

//Booking Route
app.post("/booking", async (req, res) => {
    try {
        let booking_data = new hotelModel(req.body);
        // let { email } = req.body;
        // const userData = await hotelModel.findOne({ email });
        // console.log(userData);
        // if (userData) {
        //     return res.status(409).json({ error: "Already Registered" });
        // }
        await booking_data.save();

        const payments = new Payment();
        payments.user = booking_data._id;
        payments.save();

        // console.log(booking_data);
        res.status(200).json({ success: "Route is Working"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error"})
    }
})

app.post("/:user_id/:payment_id", async (req, res) => {
    try {
        let user_id = req.params.user_id;
        // console.log(req.params);
        const paymentData = await Payment.findOne({user:user_id})
        console.log(paymentData);

        paymentData.payment_medium = "credit_card";
        paymentData.payment_date = "Mon Sep 26 2022 09:45:59 GMT+0530 (India Standard Time)";
        paymentData.isSuccessful = true;
        res.status(200).json({ "success": "Route is Working" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Internal Server Error"});
    }
})

app.listen(port, (req, res) => {
    console.log("Server Started at port : ", port);
})