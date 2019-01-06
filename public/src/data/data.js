app.service('$data', function ($resource, $api) {
    this.user = $resource(null, {}, {
        login: {
            url: $api.login,
            method: 'POST'
        },
        register: {
            url: $api.register,
            method: 'POST'
        },
        getOne: {
            url: $api.getUser,
            method: 'GET',
            params: { id: '@id' }
        },
        getAll: {
            url: $api.getUsers,
            method: 'GET'
        },
        update: {
            url: $api.updateUser,
            method: 'PUT',
            params: { id: '@id' }
        },
        delete: {
            url: $api.deleteUser,
            method: 'DELETE',
            params: { id: '@id' }
        },
        block: {
            url: $api.blockUser,
            method: 'PUT',
            params: { id: '@id' }
        },
        unBlock: {
            url: $api.unBlockUser,
            method: 'PUT',
            params: { id: '@id' }
        }
    });

    this.room = $resource(null, {}, {
        getOne: {
            url: $api.getRoom,
            method: 'GET',
            params: { id: '@id' }
        },
        getAll: {
            url: $api.getRooms,
            method: 'GET'
        },
        update: {
            url: $api.updateRoom,
            method: 'PUT',
            params: { id: '@id' }
        },
        create: {
            url: $api.postRoom,
            method: 'POST'
        },
        delete: {
            url: $api.deleteRoom,
            method: 'DELETE',
            params: { id: '@id' }
        },
        getHistory: {
            url: $api.getMessages,
            method: 'GET',
            params: { id: '@id' }
        }
    });

    this.message = $resource(null, {}, {
        update: {
            url: $api.updateMessage,
            method: 'PUT',
            params: { id: '@id' }
        },
        delete: {
            url: $api.deleteMessage,
            method: 'DELETE',
            params: { id: '@id' }
        }
    });
});
