app.service('$data', function ($resource, $api) {

    this.login = data => $resource($api.login).save(data).$promise;
    this.register = data => $resource($api.register).save(data).$promise;
    this.getUser = id => $resource($api.getUser, { id }).get().$promise;
    this.updateUser = (id, data) => $resource($api.updateUser, { id }).save(data).$promise;
    this.deleteUser = id => $resource($api.deleteUser, { id }).delete().$promise;

    this.getRooms = () => $resource($api.getRooms).get().$promise;
    this.getRoom = id => $resource($api.getRoom, { id }).get().$promise;
    this.updateRoom = (id, data) => $resource($api.updateRoom, { id }).save(data).$promise;
    this.creteRoom = data => $resource($api.postRoom).save(data).$promise;
    this.deleteRoom = id => $resource($api.deleteRoom, { id }).delete().$promise;

    this.getMessages = roomId => $resource($api.getMessages, { id: roomId }).get().$promise;
    this.postMessage = data => $resource($api.postMessage).save(data).$promise;
    this.updateMessage = (id, data) => $resource($api.updateMessage, { id }).save(data).$promise;
    this.deleteMessage = id => $resource($api.deleteMessage, { id }).delete().$promise;
});
