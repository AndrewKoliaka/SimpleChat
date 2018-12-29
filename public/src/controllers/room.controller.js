app.controller('room.controller', function ($scope, $state, $roomData, $errorAlert) {
    this.$onInit = () => {
        $scope.room = {
            data: null,
            isSpinner: false
        };

        const { roomId } = $state.params;

        this._getRoomData(roomId);
    };

    this._getRoomData = roomId => {
        $scope.room.isSpinner = true;

        $roomData.getRoom(roomId)
            .then(({ data }) => { $scope.room.data = data; })
            .catch($errorAlert.show)
            .finally(() => { $scope.room.isSpinner = false; });
    };
});
