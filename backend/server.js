const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config.json');
const userRouter = require('./routes/userRouter');
const roomRouter = require('./routes/roomRouter');
const messageRouter = require('./routes/messageRouter');
const io = require('socket.io');
const socketIoCookie = require('socket.io-cookie');
const socketController = require('./controllers/socketController');
const socketAuthMiddleware = require('./middlewares/socketAuthMiddleware');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketServer = io(server);

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
    useNewUrlParser: true
});

app.use(express.static('bin'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/messages', messageRouter);

socketServer.use(socketIoCookie);
socketServer.use(socketAuthMiddleware);
socketController.init(socketServer);

server.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on ${config.port}`);
});
