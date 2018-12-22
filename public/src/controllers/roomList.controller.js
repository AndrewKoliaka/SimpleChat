app.controller('roomList.controller', function ($scope, $state, $roomData) {
    this.$onInit = () => {
        $scope.roomList = {
            rooms: [],
            isSpinner: false
        };

        this.loadRooms();
    };

    this.loadRooms = () => {
        $scope.roomList.isSpinner = true;

        $roomData.getRooms()
            .then(({ data }) => { $scope.roomList.rooms = data })
            .finally(() => { $scope.roomList.isSpinner = false; });
    };

    this.createRoom = () => $state.go('users');

    this.renameRoom = id => {
        const newRoomName = prompt('Please enter new name', 'My chat');

        if (newRoomName) {
            $roomData.update(id, { name: newRoomName })
                .then(this.loadRooms);
        }
    };

    this.deleteRoom = id => {
        $roomData.delete(id).then(this.loadRooms)
    };
});
