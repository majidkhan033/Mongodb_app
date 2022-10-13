import express from "express";
// import bcrypt from "bcrypt";
const app = express();

//Connect DB
import "./db_connect.js";

//Import MongoDB Model
import hotelModel from "./models/hotels.js";
import Payment from "./models/Payment.js";

const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("SERVER IS UP")
})

//Booking Route
app.post("/booking", async (req, res) => {
    try {
        // console.log(req.body);
        // let { email } = req.body;
        // console.log(email);
        // const userData = await hotelModel.findOne({ email: req.body.user.email });
        // console.log(userData);
        // if (userData) {
        //     return res.status(409).json({ "error": "Already Registered" })
        // }

        let booking_data = new hotelModel(req.body);
        await booking_data.save();

        const payments = new Payment();
        payments.user = booking_data._id;
        payments.save();

        // console.log(booking_data);
        res.status(200).json({ "success": "Route is Working" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Internal Server Error" })
    }
})


app.post("/:user_id", async (req, res) => {
    try {
        let user_id = req.params.user_id;
        // console.log(req.params);
        const paymentData = await Payment.findOne({ user: user_id }).populate("user");
        console.log(paymentData);


        // paymentData.payments.push({
        //     "payment_medium": "credit_card",
        //     "payment_date": new Date("Mon Sep 26 2022 09:41:37 GMT+0530"),
        //     "isSuccessful": true
        // });
        // console.log(paymentData.payments[0].payment_date);
        // paymentData.save();

        res.status(200).json({ "success": "Route is Working" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Internal Server Error" })
    }
})


app.post("/:user_id/:payment_id", async (req, res) => {
    try {

        // let user_id = req.params.user_id;
        let payment_id = req.params.payment_id;

        const filter = { _id: payment_id };

        const update = { isSuccessful: false };

        let paymentModified = await Payment.findOneAndUpdate(filter, update);

        paymentModified.save();
        res.status(200).json({ "success": "Route is Working" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Internal Server Error" })
    }
})

app.listen(port, (req, res) => {
    console.log("Server Started at Port ", port);
})