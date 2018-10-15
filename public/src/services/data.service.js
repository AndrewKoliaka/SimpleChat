app.service('$data', function ($resource, $api) {
    this.login = params => $resource($api.login).save(params).$promise;
    this.register = params => $resource($api.register).save(params).$promise;
    this.getRooms = () => $resource($api.getRooms).get().$promise;
    this.getRoom = id => $resource($api.getRoom, { id }).get().$promise;
    this.updateRoom = (id, params) => $resource($api.updateRoom, { id }).save(params).$promise;
    this.creteRoom = params => $resource($api.postRoom).save(params).$promise;
    this.deleteRoom = id => $resource($api.deleteRoom, { id }).delete().$promise;
    this.getMessages = roomId => $resource($api.getMessages, { id: roomId }).get().$promise;
    this.postMessage = params => $resource($api.postMessage).save(params).$promise;
    this.updateMessage = (id, params) => $resource($api.updateMessage, { id }).save(params).$promise;
    this.deleteMessage = id => $resource($api.deleteMessage, { id }).delete().$promise;
});
