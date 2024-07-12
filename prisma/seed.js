const { PrismaClient } = require('@prisma/client');
const products = require('./static/products');

const prisma = new PrismaClient();

const CreateProduct = async () => {
  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        kode: product.kode,
        name: product.name,
        price: product.price,
        weight: product.weight ? product.weight : 0,
        description: product.description,
      },
    });

    console.log(createdProduct);
  }
};

const main = async () => {
  // can add more seed if needed
  await CreateProduct();
  console.log('done');
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
