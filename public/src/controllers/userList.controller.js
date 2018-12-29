app.controller('userList.controller', function ($scope, $userData, $errorAlert, $roomData, $authData, $state) {
    this.$onInit = () => {
        $scope.userList = {
            users: [],
            banList: [],
            isSpinner: false
        };

        this._getUsers();
    };

    this._getUsers = () => {
        $scope.userList.isSpinner = true;

        $userData.getUserList()
            .then(({ data }) => {
                $scope.userList.users = data.userList;
                $scope.userList.banList = data.banList;
            })
            .catch($errorAlert.show)
            .finally(() => { $scope.userList.isSpinner = false; });
    };

    this.checkIsBlocked = id => $scope.userList.banList.includes(id);

    this.blockUser = id => $userData.blockUser(id)
        .then(this._getUsers)
        .catch($errorAlert.show);

    this.unBlockUser = id => $userData.unBlockUser(id)
        .then(this._getUsers)
        .catch($errorAlert.show);

    this.createRoom = interlocutorId => {
        const roomName = prompt('Enter chat name', 'Super chat 1');

        if (!roomName || !interlocutorId) return;

        const userId = $authData.getUserId();
        const roomData = { name: roomName, participants: [userId, interlocutorId] };

        $roomData.create(roomData)
            .then(({ data }) => {
                const roomId = data._id;

                $state.go('room', { roomId });
            })
            .catch($errorAlert.show);
    };
});
