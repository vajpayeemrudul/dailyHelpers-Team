import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/admin.js";
import serviceProviderRoutes from "./routes/serviceProvider.js";
import customerRoutes from "./routes/customer.js";

const app = express();

app.use(bodyParser.json({limit: '30mb', extended: 'true'}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: 'true'}));
app.use(cors());

dotenv.config();

app.use("/admin", adminRoutes);
app.use("/serviceProvider", serviceProviderRoutes);
app.use("/customer", customerRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to daily helpers API!!");
})

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((err) => console.log(err.message))