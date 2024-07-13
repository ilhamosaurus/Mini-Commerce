const db = require('../util/db');

const getAllProducts = async (merchant, pageSize, page) => {
  if (merchant) {
    if (pageSize && page) {
      const products = await db.product.findMany({
        where: {
          merchant: merchant,
        },
        select: {
          kode: true,
          name: true,
          price: true,
          weight: true,
          description: true,
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
      if (!products || products.length === 0) {
        return null;
      }
      return products;
    }
    const products = await db.product.findMany({
      where: {
        merchant: merchant,
      },
      select: {
        kode: true,
        name: true,
        price: true,
        weight: true,
        description: true,
      },
    });
    if (!products || products.length === 0) {
      return null;
    }
    return products;
  } else if (!merchant && pageSize && page) {
    const products = await db.product.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      select: {
        merchant: true,
        kode: true,
        name: true,
        price: true,
        weight: true,
        description: true,
      },
    });
    if (!products || products.length === 0) {
      return null;
    }
    return products;
  }

  const products = await db.product.findMany({
    select: {
      merchant: true,
      kode: true,
      name: true,
      price: true,
      weight: true,
      description: true,
    },
  });
  if (!products || products.length === 0) {
    return null;
  }
  return products;
};

const getProductsByCode = async (code) => {
  const product = await db.product.findUnique({
    where: {
      kode: code,
    },
    select: {
      merchant: true,
      kode: true,
      name: true,
      price: true,
      weight: true,
      description: true,
    },
  });
  if (!product) {
    return null;
  }
  return product;
};

module.exports = { getAllProducts, getProductsByCode };
