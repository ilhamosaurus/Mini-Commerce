const {
  PrismaClientKnownRequestError,
} = require('@prisma/client/runtime/library');
const { getAllProducts, getProductsByCode } = require('../data/product');
const db = require('../util/db');
const { Role } = require('@prisma/client');
const { validationResult } = require('express-validator');

const getProducts = async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || undefined;
  const page = parseInt(req.query.page) || undefined;
  const merchant = req.query.merchant || undefined;
  try {
    const products = await getAllProducts(merchant, pageSize, page);
    if (!products) {
      return res.status(404).json({ error: 'Products not found' });
    }

    return res.status(200).json({
      data: products,
      total: pageSize ? pageSize : products.length,
      page: page ? page : 1,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Failed to retreive products: ${error}` });
  }
};

const getProduct = async (req, res) => {
  const kode = req.params.code;
  try {
    const product = await getProductsByCode(kode.toUpperCase());
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Failed to retreive product: ${error}` });
  }
};

const createProduct = async (req, res) => {
  const role = req.role;
  if (role !== Role.MERCHANT) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((error) => error.msg) });
  }

  const username = req.username;
  const { code, name, price, weight, description } = req.body;
  try {
    const createdProduct = await db.product.create({
      data: {
        merchant: username,
        kode: code,
        name,
        price,
        weight,
        description,
      },
    });

    return res.status(201).json(createdProduct);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return res
        .status(409)
        .json({ error: `Product with code ${code} already exists` });
    }
    console.error(error);
    return res
      .status(500)
      .json({ error: `Failed to create product: ${error}` });
  }
};

const updateProduct = async (req, res) => {
  const role = req.role;
  if (role !== Role.MERCHANT) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((error) => error.msg) });
  }

  const kode = req.params.code;
  const username = req.username;
  const { name, price, weight, description } = req.body;
  try {
    const existingProduct = await getProductsByCode(kode.toUpperCase());
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = await db.product.update({
      where: { kode: kode.toUpperCase() },
      data: {
        merchant: username,
        name,
        price,
        weight,
        description,
      },
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Failed to update product: ${error}` });
  }
};

const deleteProduct = async (req, res) => {
  const role = req.role;
  if (role !== Role.MERCHANT) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const kode = req.params.code;
  try {
    const existingProduct = await getProductsByCode(kode.toUpperCase());
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await db.product.delete({
      where: { kode: kode.toUpperCase() },
    });

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Failed to delete product: ${error}` });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
