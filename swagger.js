// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Refuge API',
    description: 'API documentation for Refuge backend',
  },
  host: 'localhost:3000', // or your deployed host later
  schemes: ['http'],
};

const outputFile = './swagger.json'; // this will be generated
const endpointsFiles = ['./route/user.js']; // adjust to your actual route file(s)

swaggerAutogen(outputFile, endpointsFiles, doc);
