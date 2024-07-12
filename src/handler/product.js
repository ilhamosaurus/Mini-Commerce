const db = require('../util/db');

const getProducts = async (req, res) => {
  try {
    const products = await db.product.findMany({
      select: {
        kode: true,
        name: true,
        price: true,
        weight: true,
        description: true,
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).send({ message: 'Products not found' });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Failed to retreive products: ${error}` });
  }
};

module.exports = { getProducts };
