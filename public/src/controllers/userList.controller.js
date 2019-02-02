app.controller('userList.controller', function ($scope, $userData, $roomData, $authData, $state, $async) {


    this.$onInit = () => {
        $scope.userList = {
            users: [],
            banList: []
        };

        this._getUsers();
    };

    async function _getUsers () {
        const { data } = await $userData.getUserList();

        $scope.userList.users = data.userList;
        $scope.userList.banList = data.banList;
    };

    this._getUsers = $async(_getUsers);

    this.checkIsBlocked = id => $scope.userList.banList.includes(id);

    this.blockUser = async id => {
        await $userData.blockUser(id);

        this._getUsers();
    };

    this.unBlockUser = async id => {
        await $userData.unBlockUser(id);

        this._getUsers();
    };

    this.createRoom = async interlocutorId => {
        const roomName = prompt('Enter chat name', 'Super chat 1');

        if (!roomName || !interlocutorId) return;

        const userId = $authData.getUserId();
        const roomData = { name: roomName, participants: [userId, interlocutorId] };

        const { data } = await $roomData.create(roomData);

        const roomId = data._id;

        $state.go('room', { roomId });
    };
});
