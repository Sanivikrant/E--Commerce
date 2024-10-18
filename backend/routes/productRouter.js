const express = require("express");
const router = express.Router();
const {createProduct, getProduct, getSingleProduct, deleteProduct, updateProduct, reviewProduct} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, createProduct);
router.get("/", getProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.patch("/:id", protect, adminOnly, updateProduct);

router.patch("/review/:id", protect, reviewProduct);

module.exports = router;