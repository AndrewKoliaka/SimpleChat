const express = require('express');
const config = require('./config.json');
const app = express();

app.use(express.static('bin'));

app.listen(config.port, () => {
    console.log(`Server is listening on ${config.port}`);
});
