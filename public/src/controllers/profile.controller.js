app.controller('profile.controller', function ($scope, $profileData, $authData, $state) {
    this.$onInit = () => {
        $scope.profile = {
            data: {
                id: null,
                name: null,
                email: null
            }
        };

        $scope.profile.data = $authData.decodeToken().payload;
    };

    this.enterUserName = () => {
        const newUserName = prompt('Please enter your new name', 'Harry Potter');

        if (newUserName) {
            $scope.profile.data.name = newUserName;
        }
    };

    this.updateUserData = () => {
        const { id, name } = $scope.profile.data;

        $profileData.updateUser(id, { name });
    };

    this.deleteAccount = () => {
        const isConfirm = confirm('Are sure? You will not be able to revert this change');

        if (!isConfirm) return;

        $profileData.deleteUser($scope.profile.data.id)
            .then(() => {
                $authData.signOut();
                $state.go('register');
            });
    };
});
