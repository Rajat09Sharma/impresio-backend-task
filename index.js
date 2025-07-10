require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const partnerRouter = require("./routes/partner");
const inquiryRouter = require("./routes/inquiry");


const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/api/auth", authRouter);
app.use("/api/partner", partnerRouter);
app.use("/api/inquiry", inquiryRouter);



app.listen(PORT, () => {
    console.log(`Server started successfully on ${PORT}`);
});



//  {
//     "id": 28,
//     "name": "Candid Tales",
//     "location": "Pune",
//     "price": 7708,
//     "rating": 4.7,
//     "styles": [
//                 "Studio"
//             ],
//     "tags": [
//                 "Birthday"
//             ],
//             "bio": "Top-rated for emotional storytelling and creative composition.",
//             "profilePic": "/images/snapshot.jpg",
//             "portfolio": [
//                 "/images/snapshot1.jpg",
//                 "/images/snapshot2.jpg"
//             ],
//             "reviews": [
//                 {
//                     "name": "Aditya",
//                     "rating": 4.8,
//                     "comment": "Excellent service and fantastic shots!",
//                     "date": "2024-10-09"
//                 }
//             ]
//         },
//     }