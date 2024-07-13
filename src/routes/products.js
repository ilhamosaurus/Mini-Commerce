const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require('../handler/product');
const { verifyToken } = require('../middleware/auth');
const {
  createProductValidator,
  updateProductValidator,
} = require('../validator/product');
const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('/', verifyToken, createProductValidator, createProduct);
productRouter.get('/:code', getProduct);
productRouter.patch(
  '/:code',
  verifyToken,
  updateProductValidator,
  updateProduct
);
productRouter.delete('/:code', verifyToken, deleteProduct);

module.exports = productRouter;
