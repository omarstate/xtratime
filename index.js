require('dotenv').config();
const express = require('express');
const app = express();
require('./startup/db')();
require('./startup/routes')(app);

app.use(express.json());

// ✅   Port Configuration
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;