const express = require('express');
const path=require('path');

const port = process.env.PORT || 3000; //process.env.PORT  used by Heroku
const publicPath = path.join(__dirname, '/../public');
// console.log(__dirname + '/../public');
// console.log(publicPath);

var app = express();
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});