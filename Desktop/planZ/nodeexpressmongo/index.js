const express = require('express');
const multer = require('multer')
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
// init app
const app = express();
const postRouter = require('./routes/post');
var bodyParser = require('body-parser')
var cors = require('cors')

//MiddleWare
app.use(cors());

//middleware post for Body parser
// app.use(express.json());
app.use(bodyParser.json())


//ADD env config
require('dotenv').config()


//Routes Midddleware
//Post_route
app.use('/post', postRouter);

app.get('/', (req, res) => {
    res.render('app')
    res.send('Ok')
})
app.set('view engine','ejs');

// public folder
app.use(express.static('./public'))

//connect DB
mongoose.connect(process.env.mongoConnection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => {
        console.log('Connected to DB')
    })


const PORT = process.env.PORT || process.env.localhost

app.listen(PORT, () => console.log(`Port Listening in ${PORT}`))