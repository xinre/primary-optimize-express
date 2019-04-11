const express = require('../index');
const app = express();


app.get('/', function (req, res) {
    res.send('hello world');
});
app.get('/te', function (req, res) {
    res.send('jijkjkj');
});

app.listen(3006, function () {
    console.log('Example app listening on port 3006!');
});