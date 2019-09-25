const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => console.log(`Minimal Pairs App listening on port ${port}!`))