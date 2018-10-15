app.constant('$api', {
    login: '/api/auth/login',
    register: '/api/auth/register',
    getRooms: '/api/rooms',
    getRoom: '/api/rooms/:id',
    postRoom: '/api/rooms',
    updateRoom: '/api/rooms/:id',
    deleteRoom: '/api/rooms/:id',
    getMessages: '/api/rooms/:id/messages',
    postMessage: '/api/messages',
    updateMessage: '/api/messages/:id',
    deleteMessage: '/api/messages/:id'
});
