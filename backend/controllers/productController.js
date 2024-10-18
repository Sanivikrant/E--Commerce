const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    description,
    image,
    regularPrice,
    price,
    color,
  } = req.body;

  if (!name || !category || !brand || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Product

  const product = await Product.create({
    name,
    sku,
    category,
    brand,
    quantity,
    description,
    image,
    regularPrice,
    price,
    color,
  });

  res.status(201).json(product);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.find().sort("-createdAt");
  res.status(201).json(product);
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  res.status(200).json(product);
});

// Delete Product

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Product Deleted." });
});

// Update Product

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    quantity,
    description,
    image,
    regularPrice,
    price,
    color,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name,
      category,
      brand,
      quantity,
      description,
      image,
      regularPrice,
      price,
      color,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

const reviewProduct = asyncHandler(async (req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add a star and review");
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  product.ratings.push({
    star,
    review,
    reviewDate,
    name: req.user.name,
    userID: req.user._id,
  });
  
  product.save();
  res.status(200).json({ message: "Product review added." });
});

module.exports = {
  createProduct,
  getProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
};
