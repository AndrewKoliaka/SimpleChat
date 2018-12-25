app.controller('roomList.controller', function ($scope, $state, $roomData, $errorAlert) {
    this.$onInit = () => {
        $scope.roomList = {
            rooms: [],
            isSpinner: false
        };

        this._loadRooms();
    };

    this._loadRooms = () => {
        $scope.roomList.isSpinner = true;

        $roomData.getRooms()
            .then(({ data }) => { $scope.roomList.rooms = data })
            .catch($errorAlert.show)
            .finally(() => { $scope.roomList.isSpinner = false; });
    };

    this.createRoom = () => $state.go('users');

    this.renameRoom = room => {
        const newRoomName = prompt('Please enter new name', 'My chat');

        if (!newRoomName) return;

        const updateData = { ...room, name: newRoomName };

        $roomData.update(room._id, updateData)
            .then(this._loadRooms)
            .catch($errorAlert.show);
    };

    this.deleteRoom = id =>
        $roomData.delete(id)
        .then(this._loadRooms)
        .catch($errorAlert.show);

    this.openRoom = roomId => $state.go('room', { roomId });
});
