const mongoose = require('mongoose');
//import env
require("dotenv").config();

const DB_CONNECT = process.env.DB_URL

//function for DB Connection
const connectDB = async () => {
mongoose.connect(DB_CONNECT)
.then(()=>{
  console.log("DB connected successfully")
})
.catch((err)=>{
  console.error("Erro while connecting with Databse",err)
})
};

module.exports = connectDB;
