app.controller('room.controller', function ($scope, $state, $roomData, $errorAlert, $socket, $authData, $socketEvents) {
    this.$onInit = () => {
        $scope.room = {
            userId: $authData.getUserId(),
            data: null,
            isSpinner: false,
            isTyping: false,
            message: '',
            history: []
        };

        const { roomId } = $state.params;

        this._getRoomData(roomId);
        this._getHistory(roomId);

        $socket.connect();
        $socket.on($socketEvents.MESSAGE, data => {
            $scope.room.history.push(data);
            $scope.$apply();
        });
        $socket.on($socketEvents.MESSAGE_IS_TYPING, data => {
            $scope.room.isTyping = !!data.message;
            $scope.$apply();
        });
        $socket.on($socketEvents.ERROR, $errorAlert.show);
    };

    this._getRoomData = roomId => {
        $scope.room.isSpinner = true;

        $roomData.getRoom(roomId)
            .then(({ data }) => { $scope.room.data = data; })
            .catch($errorAlert.show)
            .finally(() => { $scope.room.isSpinner = false; });
    };

    this._getHistory = roomId => {
        $scope.room.isSpinner = true;

        $roomData.getHistory(roomId)
            .then(({ data }) => { $scope.room.history = data; })
            .catch($errorAlert.show)
            .finally(() => { $scope.room.isSpinner = false; });
    };

    this.sendMessage = () => {
        if (!$scope.room.message) return;

        const messageData = {
            roomId: $scope.room.data._id,
            text: $scope.room.message
        };

        $socket.emit($socketEvents.MESSAGE, messageData);
        $scope.room.message = '';
    };

    this.onTypeMessage = () => $socket.emit($socketEvents.MESSAGE_IS_TYPING, $scope.room.message);

    this.checkIsMe = id => id === $scope.room.userId;
});
