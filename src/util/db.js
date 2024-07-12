const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const db = new PrismaClient();

module.exports = db;
