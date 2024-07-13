const { PrismaClient } = require('@prisma/client');
const products = require('./static/products');

const prisma = new PrismaClient();

const CreateProduct = async () => {
  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
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
