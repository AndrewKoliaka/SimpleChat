app.controller('roomList.controller', function ($scope, $state, $roomData, $authData) {
    this.$onInit = () => {
        $scope.roomList = {
            rooms: [],
            userId: $authData.getUserId()
        };

        this._loadRooms();
    };

    this._loadRooms = () => $roomData.getRooms()
        .then(({ data }) => { $scope.roomList.rooms = data; });

    this.createRoom = () => $state.go('users');

    this.renameRoom = room => {
        const newRoomName = prompt('Please enter new name', 'My chat');

        if (!newRoomName) return;

        const updateData = { ...room, name: newRoomName };

        $roomData.update(room._id, updateData)
            .then(this._loadRooms);
    };

    this.deleteRoom = id => $roomData.delete(id)
        .then(this._loadRooms);

    this.openRoom = roomId => $state.go('room', { roomId });

    this.leaveRoom = roomId => $roomData.leaveRoom(roomId)
        .then(this._loadRooms);
});
