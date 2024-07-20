import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('connected',() =>{
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error',(err) =>{
    console.log("MongoDB connection error:",err);
});

//customerSchema
const customerSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    phone:String,
    alternatePhone:String
});

const Customer = mongoose.model("Customer",customerSchema);

export {Customer};