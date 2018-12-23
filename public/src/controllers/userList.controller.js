app.controller('userList.controller', function ($scope, $userData) {
    this.$onInit = () => {
        $scope.userList = {
            users: [],
            isSpinner: false
        };

        this.getUsers();
    };

    this.getUsers = () => {
        $scope.userList.isSpinner = true;

        $userData.getUserList()
            .then(({ data }) => { $scope.userList.users = data; })
            .finally(() => { $scope.userList.isSpinner = false; });
    };
});
