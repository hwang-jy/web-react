const express = require("express");
const router = express();

router.get('/test', (req, res) => {
    res.send({test : "test code"});
})

router.get('/admin', (req, res) => {
    res.send({id:"hwang", admin:true});
})

module.exports = router;