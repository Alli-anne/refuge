// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { initDb } = require('./database/connect');
const userRoutes = require('./route/user');
const setupSwagger = require('./swagger'); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submissions
app.use(express.json()); // ✅ add this for JSON requests
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submissions
app.use('/', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// Initialize DB and start server
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Connected to DB and listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB', err);
  });
