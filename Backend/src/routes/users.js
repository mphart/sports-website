const express = require('express');
const router = express.Router();

const db = require('../db');

router.post('/', async (req, res) => {
    console.log("[INFO] received a request to create a new user");

    try {
        const {email, username, password} = req.body;
        console.log(email);
        console.log(username);
        console.log(password);
        
    } catch (error) {
        res.status(500).send(error);
    }
    
})

router.get('/:id', (req, res) => {
    console.log(`[INFO] received a request to get user of id ${id}`);
})

module.exports = router;