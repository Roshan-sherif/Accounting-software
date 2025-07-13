const express = require("express");
const cors= require('cors')
const app = express();
const adminRoute= require('./routes/admin');
const loginRoute=require('./routes/login')
const connect = require("./db/db");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());

require('dotenv').config()

app.use('/admin',adminRoute)
app.use('/api/login',loginRoute)
app.use(cookieParser());


connect()
const PORT = 5000;

app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);
