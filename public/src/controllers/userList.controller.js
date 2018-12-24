app.controller('userList.controller', function ($scope, $userData, $errorAlert) {
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

    this.blockUser = id =>
        $userData.blockUser(id)
        .then(this._getUsers)
        .catch($errorAlert.show);

    this.unBlockUser = id =>
        $userData.unBlockUser(id)
        .then(this._getUsers)
        .catch($errorAlert.show);
});
