const express = require("express");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser")

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cookieParser());
app.use("/", require("./routes/userRoute"));
app.use("/api/expense", require("./routes/expenseRoute"));



connectDB().then(()=>{
    console.log("DB connection sucessfull!")
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    })
}).catch(()=>{
    console.log("DB connection faild");
    process.exit(1);
})