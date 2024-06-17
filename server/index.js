const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const listRoutes = require("./routes/list.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/list", listRoutes);
// mongoose
const PORT = 4000;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Camping",
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port:${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
