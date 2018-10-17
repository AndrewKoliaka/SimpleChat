const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./backend/config/config.json');
const userRouter = require('./backend/routes/userRouter');
const roomRouter = require('./backend/routes/roomRouter');
const messageRouter = require('./backend/routes/messageRouter');
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
    console.log(`Server is listening on ${config.port}`);
});
