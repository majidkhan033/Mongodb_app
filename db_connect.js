import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://m001-majid:m001-mongodb-basics@sandbox.hbdszhd.mongodb.net/hotelDB");
        console.log("MongoDB is Connected");
    } catch (error) {
        console.log(error);
    }
}

connectDB();