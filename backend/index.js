const express = require("express");
const cors= require('cors')
const app = express();
const adminRoute= require('./routes/admin');
const connect = require("./db/db");

app.use(cors());
app.use(express.json());

require('dotenv').config()

app.use('/admin',adminRoute)

connect()
const PORT = 5000;

app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);
