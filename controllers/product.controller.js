const Product = require("../models/product.model");

// CREATE
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.validatedData);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// GET ALL (Pagination, Search, Sort, Filter)
exports.getProducts = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, sort, search, category } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let query = {};

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Filter
    if (category) {
      query.category = category;
    }

    let productsQuery = Product.find(query);

    // Sorting
    if (sort) {
      productsQuery = productsQuery.sort(sort);
    }

    // Pagination
    const products = await productsQuery.skip((page - 1) * limit).limit(limit);

    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET ONE
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.validatedData,
      { new: true, runValidators: true },
    );

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
