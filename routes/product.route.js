const express = require("express");
const router = express.Router();
const {
  validateProduct,
  validateProductUpdate,
} = require("../Validation/product.validation.js");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.post("/products", validateProduct, createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", validateProductUpdate, updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
