app.service('$roomData', function ($data) {
    this.getRoom = id => $data.room.getOne({ id }).$promise
    this.getRooms = () => $data.room.getAll().$promise;
    this.create = roomData => $data.room.create(roomData).$promise;
    this.update = (id, roomData = {}) => $data.room.update({ id }, roomData).$promise;
    this.delete = id => $data.room.delete({ id }).$promise;
});
