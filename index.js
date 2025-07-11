require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const partnerRouter = require("./routes/partner");
const inquiryRouter = require("./routes/inquiry");
const adminRouter = require("./routes/admin");
const categoryRouter = require("./routes/category");
const locationRouter = require("./routes/locations");
const reviewRouter = require("./routes/review");


const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/api/auth", authRouter);

app.use("/api/partner", partnerRouter);

app.use("/api/inquiry", inquiryRouter);

app.use("/api/admin", adminRouter);

app.use("/api/category", categoryRouter);

app.use("/api/location", locationRouter);

app.use("/api/review", reviewRouter);


app.listen(PORT, () => {
    console.log(`Server started successfully on ${PORT}`);
});

