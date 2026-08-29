const express = require('express');
const router = express.Router()

router.get('/', (req, res) =>{
    res.send("This is Auth Router.")
})

module.exports = router;