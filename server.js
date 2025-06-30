require('dotenv').config();
const express = require('express');
const conncetDB = require('./startup/db');

const app = express();
conncetDB();
app.use(express.json());