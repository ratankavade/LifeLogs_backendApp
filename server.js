const express = require("express");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.disable("x-powered-by");    // hide our server details in network tab
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use("/", require("./routes/userRoute"));
app.use("/api/expense", require("./routes/expenseRoute"));
app.use("/api/diary", require("./routes/diaryRoute"));



connectDB().then(()=>{
    console.log("DB connection sucessfull!")
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    })
}).catch(()=>{
    console.log("DB connection faild");
    process.exit(1);
})