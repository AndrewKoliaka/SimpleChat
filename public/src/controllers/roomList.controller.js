app.controller('roomList.controller', function ($scope, $state, $roomData, $authData) {
    this.$onInit = () => {
        $scope.roomList = {
            rooms: [],
            userId: $authData.getUserId()
        };

        this._loadRooms();
    };

    this._loadRooms = async () => {
        const { data } = await $roomData.getRooms();

        $scope.roomList.rooms = data;
    };

    this.createRoom = () => $state.go('users');

    this.renameRoom = async room => {
        const newRoomName = prompt('Please enter new name', 'My chat');

        if (!newRoomName) return;

        const updateData = { ...room, name: newRoomName };

        await $roomData.update(room._id, updateData);

        this._loadRooms();
    };

    this.deleteRoom = async id => {
        await $roomData.delete(id);

        this._loadRooms();
    };

    this.openRoom = roomId => $state.go('room', { roomId });

    this.leaveRoom = async roomId => {
        await $roomData.leaveRoom(roomId);

        this._loadRooms();
    };
});
