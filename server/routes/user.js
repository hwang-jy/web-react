var express = require("express");
var router = express.Router();

router.get('/:id', (req, res) => {
  res.send('Received a GET request, param: ' + req.params.id);
});

router.post('/', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));

  res.json({
    succes:true,
    user: req.body.username
  });
});

router.put('/', (req, res) => {
  res.status(400).json({message: "Hey, you bad request."});
});

router.delete('/', (req, res) => {
  res.send("Received a DELETE request");
});

module.exports = router;