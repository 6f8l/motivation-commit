require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');

// Configure Mongo DB
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, (err) => {
    if (err) {
        throw err;
    } else {
        return;
    }
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, set-cookie');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
});
