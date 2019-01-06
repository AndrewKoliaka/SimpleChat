app.controller('auth.controller', function ($scope, $authData, $state) {
    this.$onInit = () => {
        $scope.auth = {
            data: {
                name: '',
                email: '',
                password: '',
                passwordRepeat: ''
            },
            userId: null
        };

        $scope.auth.userId = $authData.getUserId();
    };

    this.checkIsLogged = () => $authData.isLogged();

    this.login = () => {
        if (
            !$scope.auth.data.email ||
            !$scope.auth.data.password
        ) return;

        $authData.login($scope.auth.data)
            .then(() => {
                $scope.auth.userId = $authData.getUserId();
                $state.go('rooms');
            });
    };

    this.register = () => {
        if (
            !$scope.auth.data.email ||
            !$scope.auth.data.password ||
            !$scope.auth.data.passwordRepeat
        ) return;

        $authData.register($scope.auth.data)
            .then(() => {
                $scope.auth.userId = $authData.getUserId();
                $state.go('rooms');
            });
    };

    this.signOut = () => $authData.signOut()
        .then(() => $state.go('login'));
});
