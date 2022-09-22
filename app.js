import express from "express";

const app = express();

import "./db_connect.js";
import hotelModel from "./models/hotels.js";

const port = 5000;

app.use(express.json());

app.get("/",(req, res) => {
    res.send("SERVER IS UP")
});

//Booking Route
app.post("/booking", async (req, res) => {
    try {
        let booking_data = new hotelModel(req.body);
        let { email } = req.body;
        const userData = await hotelModel.findOne({ email });
        console.log(userData);
        if (userData) {
            return res.status(409).json({ error: "Already Registered" });
        }
        // await booking_data.save();
        // console.log(booking_data);
        res.status(200).json({ success: "Route is Working"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error"})
    }
})

app.listen(port, (req, res) => {
    console.log("Server Started at port : ", port);
})