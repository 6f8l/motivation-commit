const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const utils = require('../utils');

router.post('/register', (req, res, next) => {
    const id = utils.generateHashedId();
    const { email, password, username } = req.body;
    const user = new User({ id, email, password, username });
    console.log(user)
    user.save((err) => {
        console.log(err)
        if (err) {
            return res.status(500).json({"message": "Error registering new user please try again."});
        } else {
            return res.status(201).json({"message": "Created"});
        }
    })
})

router.get('/', (req, res, next) => {
    res.status(200).json(req.query.id);
})

module.exports = router;