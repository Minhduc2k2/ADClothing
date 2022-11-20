import express, { response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import productsRoute from "./routes/products.js";
import checkoutRoute from "./routes/checkout.js";
import categoriesRoute from "./routes/categories.js";
import reviewRoute from "./routes/reviews.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { urlencoded, json } from "express";
// import mongoosePatchUpdate from "mongoose-patch-update";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    // node > 17 => 127.0.0.1 else localhost
    await mongoose.connect("mongodb://127.0.0.1:27017/CNTT"); //process.env.MONGO //mongodb://localhost:27017/web-ec
    // await mongoose.connect(process.env.MONGO); //process.env.MONGO //mongodb://localhost:27017/web-ec
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

// middlewares
app.use(bodyParser.json({ limit: "50000mb" }));
app.use(bodyParser.urlencoded({ limit: "50000mb", extended: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors({ credentials: true, origin: true }));

app.options("*", cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/backend/auth", authRoute);
app.use("/backend/users", usersRoute);
app.use("/backend/products", productsRoute);
app.use("/backend/checkouts", checkoutRoute);
app.use("/backend/reviews", reviewRoute);
app.use("/backend/categories", categoriesRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend");
});