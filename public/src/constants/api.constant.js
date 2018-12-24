app.constant('$api', {
    getUsers: '/api/users',
    login: '/api/users/login',
    register: '/api/users/register',
    getUser: '/api/users/:id',
    updateUser: '/api/users/:id',
    deleteUser: '/api/users/:id',
    blockUser: '/api/users/:id/block',
    unBlockUser: '/api/users/:id/unblock',

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
