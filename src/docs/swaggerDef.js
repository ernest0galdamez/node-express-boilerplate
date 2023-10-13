const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'node-express-boilerplate API documentation',
    version: '1.0.0',
    description: 'Open source project of Ernesto Galdamez',
    contact: {
      name: 'Ernesto Galdamez',
      url: 'https://github.com/ernest0galdamez',
      email: 'mail@ernestogaldamez.com',
    },
    license: {
      name: 'MIT',
      url: 'https://github.com/ernest0galdamez/node-express-boilerplate/blob/main/LICENSE',
    },
  },
  externalDocs: {
    url: 'https://github.com/ernest0galdamez/node-express-boilerplate',
    description: 'Find more info here',
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Local server',
    },
  ],
  security: [
    {
      bearerAuth: [], // JWT authentication
    },
  ],
};

module.exports = swaggerDef;
