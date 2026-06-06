require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", apiRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server on port " + PORT));
