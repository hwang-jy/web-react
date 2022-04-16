const express = require("express");
const app = express();


/**Routes */
var userRouter = require('./routes/user');

/**Middlewares */
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', express.static('public'));
app.use('/user', userRouter);

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})