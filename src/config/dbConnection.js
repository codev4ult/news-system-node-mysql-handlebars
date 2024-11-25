import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {});
        console.log("Connection to the MongoDB Atlas database made successfully!");
    } catch (err) {
        console.error(`Error connecting to database: ${err}`);
    }
};

export default connectDB;
