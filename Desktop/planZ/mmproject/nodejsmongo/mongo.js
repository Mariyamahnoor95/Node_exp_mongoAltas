const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require("dotenv").config;
// console.log(process.env.MONGOURI)
// console.log("hello world")
mongoose.createConnection(process.env.MONGOURI)

