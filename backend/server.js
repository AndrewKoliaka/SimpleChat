const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config.json');
const userRouter = require('./routes/userRouter');
const roomRouter = require('./routes/roomRouter');
const messageRouter = require('./routes/messageRouter');
const app = express();

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
    useNewUrlParser: true
});

app.use(express.static('bin'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/messages', messageRouter);

app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on ${config.port}`);
});
