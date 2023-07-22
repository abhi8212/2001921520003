const express= require("express");
const bodyParser=require("body-parser");
const axios=require("axios");
const app=express();
const dotenv=require("dotenv");
dotenv.config();
const customError = require("./utils/customeError");
const globalErrorHandler = require("./controller/globalErrorHandler");
const getAllTrains = require("./controller/train");
const PORT =process.env.PORT || 8000;
const url = process.env.GET_ALL_TRAIN_API;
const token = process.env.API_TOKEN;
// console.log(url, token);
// middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/trains",getAllTrains)

// for uncaught exceptions
process.on('uncaughtException',(error)=>{
    console.log(error.message);
    process.exit(1);
});











// ------global error handler ----------------------------
app.use(globalErrorHandler)
app.listen(PORT,()=>{
    console.log(`App is runing on localhost:${PORT}`);
})
process.on('unhandledRejection',(error)=>{
    console.log("unhandledRejection ",error.message);
})