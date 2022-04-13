const express = require("express");
const app = express();
const api = require('./routes/index');

app.use('/api', api);

app.get('/', (req, res) => {
    res.send({test : "test json"});
})

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})