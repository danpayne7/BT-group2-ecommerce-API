const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database/database");
const productRoutes = require("./routes/product.route");
const RequestLogger = require("./middleWare/logger");
const cors = require("cors");
const errorHandler = require("./middleWare/errorHandler");

app.use(cors());
app.use(RequestLogger);

(async () => {
  await connectDB();

  app.use(express.json());

  // Routes
  app.use("/api", productRoutes);
  app.get("/api", (req, res) => {
    res.status(200).json({ message: "Api found" });
  });

  const PORT = process.env.PORT || 3000;
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
