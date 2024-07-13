const { PrismaClient, Role } = require('@prisma/client');
const bycrpt = require('bcryptjs');
const products = require('./static/products');

const prisma = new PrismaClient();

const merchant = {
  username: 'berkah',
  password: 'berkah',
  role: Role.MERCHANT,
};

const CreateMerchant = async () => {
  const hashedPassword = await bycrpt.hash(merchant.password, 10);

  const createdMerchant = await prisma.user.create({
    data: {
      username: merchant.username,
      password: hashedPassword,
      role: merchant.role,
      Account: {
        create: {
          balance: 0,
        },
      },
    },
  });

  console.log(createdMerchant);
};

const CreateProduct = async () => {
  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        merchant: merchant.username,
      },
    });

    console.log(createdProduct);
  }
};

const main = async () => {
  // can add more seed if needed
  await CreateMerchant();
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
