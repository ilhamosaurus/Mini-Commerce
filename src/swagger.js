const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const specs = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini-commerce Transactions API',
      version: '1.0.0',
      description: 'Documentation for Take Home Test API',
    },
    consumes: ['application/json'],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [],
  },
  apis: ['./src/routes/*.doc.js'],
});

module.exports = { specs, swaggerUi };
