const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")
const errorHandler = require("./middleware/errorHandler")

const app = express()



mongoose.set('strictQuery', false);

//MiddleWares

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(
    cors({
    origin: ["http://localhost:3000", "http://shopitoapp.vercel.app"],
    credentials: true,
    })
);


//Routes

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);


app.get("/", (req, res) => {
    res.send("Home Page...");
});


//Error Middleware

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
}).catch((err) => console.log(err))

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });