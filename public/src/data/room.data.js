app.service('$roomData', function ($data) {
    this.getRooms = () => $data.room.getAll().$promise;
    this.create = () => $data.room.create().$promise;
    this.update = (id, roomData = {}) => $data.update({ id }, roomData).$promise;
    this.delete = id => $data.delete({ id }).$promise;
});
